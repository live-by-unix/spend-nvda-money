import { useState, useCallback, useRef, useEffect } from "react";
import { INITIAL_MONEY, ITEMS, ACHIEVEMENTS, CONFETTI_ITEMS } from "./gameData";
import confetti from "canvas-confetti";

const STORAGE_KEY = "nvidia_spend_game";
const LEADERBOARD_KEY = "nvidia_spend_leaderboard";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

function loadLeaderboard() {
  try {
    const saved = localStorage.getItem(LEADERBOARD_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function saveLeaderboard(lb) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb));
  } catch {}
}

const defaultState = {
  moneyRemaining: INITIAL_MONEY,
  moneySpent: 0,
  inventory: {},
  totalPurchases: 0,
  achievements: [],
  startTime: Date.now(),
  completedAt: null,
  soundEnabled: true,
};

function fireConfetti() {
  const count = 200;
  const defaults = { origin: { y: 0.7 }, zIndex: 9999 };
  confetti({ ...defaults, particleCount: count * 0.25, spread: 26, startVelocity: 55, colors: ["#76B900", "#ffffff", "#000000"] });
  confetti({ ...defaults, particleCount: count * 0.2, spread: 60, colors: ["#76B900", "#88cc11", "#99dd22"] });
  confetti({ ...defaults, particleCount: count * 0.35, spread: 100, decay: 0.91, scalar: 0.8, colors: ["#76B900", "#ffffff", "#55aa00"] });
  confetti({ ...defaults, particleCount: count * 0.1, spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ["#76B900"] });
  confetti({ ...defaults, particleCount: count * 0.1, spread: 120, startVelocity: 45, colors: ["#76B900", "#66aa00"] });
}

function fireMassiveConfetti() {
  const duration = 5000;
  const end = Date.now() + duration;
  const colors = ["#76B900", "#ffffff", "#88cc11", "#55aa00", "#000000"];
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors, zIndex: 9999 });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors, zIndex: 9999 });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Simple audio with Web Audio API — shared singleton context
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}

function createBeep(frequency, duration, volume = 0.1) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = frequency;
    osc.type = "sine";
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

export function playPurchaseSound() { createBeep(880, 0.1, 0.08); setTimeout(() => createBeep(1100, 0.1, 0.06), 80); }
export function playSellSound() { createBeep(660, 0.1, 0.08); setTimeout(() => createBeep(440, 0.15, 0.06), 80); }
export function playAchievementSound() {
  createBeep(523, 0.15, 0.08);
  setTimeout(() => createBeep(659, 0.15, 0.07), 120);
  setTimeout(() => createBeep(784, 0.15, 0.06), 240);
  setTimeout(() => createBeep(1047, 0.25, 0.08), 360);
}
export function playVictorySound() {
  [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => {
    setTimeout(() => createBeep(f, 0.2, 0.08), i * 150);
  });
}

export function useGameState() {
  const [state, setState] = useState(() => loadState() || { ...defaultState });
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  useEffect(() => { saveState(state); }, [state]);

  const addToast = useCallback((message, emoji) => {
    const id = ++toastId.current;
    setToasts(prev => [...prev, { id, message, emoji }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const checkAchievements = useCallback((newState) => {
    const newAchievements = [...newState.achievements];
    let changed = false;
    ACHIEVEMENTS.forEach(a => {
      if (!newAchievements.includes(a.id) && a.check(newState)) {
        newAchievements.push(a.id);
        changed = true;
        addToast(`Achievement: ${a.name}`, a.emoji);
        if (newState.soundEnabled) playAchievementSound();
      }
    });
    if (changed) return { ...newState, achievements: newAchievements };
    return newState;
  }, [addToast]);

  const buyItem = useCallback((itemName, quantity = 1) => {
    setState(prev => {
      const item = ITEMS.find(i => i.name === itemName);
      if (!item) return prev;
      const totalCost = item.price * quantity;
      if (totalCost > prev.moneyRemaining) return prev;

      let newState = {
        ...prev,
        moneyRemaining: prev.moneyRemaining - totalCost,
        moneySpent: prev.moneySpent + totalCost,
        inventory: { ...prev.inventory, [itemName]: (prev.inventory[itemName] || 0) + quantity },
        totalPurchases: prev.totalPurchases + quantity,
      };

      if (prev.soundEnabled) playPurchaseSound();
      if (CONFETTI_ITEMS.includes(itemName) && (prev.inventory[itemName] || 0) === 0) {
        fireConfetti();
      }

      newState = checkAchievements(newState);

      if (newState.moneyRemaining === 0 && !newState.completedAt) {
        newState.completedAt = Date.now();
        if (newState.soundEnabled) playVictorySound();
        fireMassiveConfetti();
        const lb = loadLeaderboard();
        lb.push({
          completionTime: newState.completedAt - newState.startTime,
          totalPurchases: newState.totalPurchases,
          completedAt: new Date(newState.completedAt).toISOString(),
          date: new Date().toLocaleDateString(),
        });
        lb.sort((a, b) => a.completionTime - b.completionTime);
        saveLeaderboard(lb.slice(0, 10));
      }

      return newState;
    });
  }, [checkAchievements]);

  const sellItem = useCallback((itemName, quantity = 1) => {
    setState(prev => {
      const item = ITEMS.find(i => i.name === itemName);
      if (!item) return prev;
      const owned = prev.inventory[itemName] || 0;
      const actualQty = Math.min(quantity, owned);
      if (actualQty <= 0) return prev;
      const refund = item.price * actualQty;

      if (prev.soundEnabled) playSellSound();

      const newInventory = { ...prev.inventory };
      newInventory[itemName] = owned - actualQty;
      if (newInventory[itemName] === 0) delete newInventory[itemName];

      let newState = {
        ...prev,
        moneyRemaining: prev.moneyRemaining + refund,
        moneySpent: prev.moneySpent - refund,
        inventory: newInventory,
        totalPurchases: prev.totalPurchases - actualQty,
        completedAt: null,
      };

      return newState;
    });
  }, []);

  const getMaxBuyable = useCallback((itemName) => {
    const item = ITEMS.find(i => i.name === itemName);
    if (!item) return 0;
    return Math.floor(state.moneyRemaining / item.price);
  }, [state.moneyRemaining]);

  const toggleSound = useCallback(() => {
    setState(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const resetGame = useCallback(() => {
    setState({ ...defaultState, startTime: Date.now(), soundEnabled: state.soundEnabled });
  }, [state.soundEnabled]);

  const getMostExpensiveOwned = useCallback(() => {
    let most = null;
    let maxPrice = 0;
    Object.keys(state.inventory).forEach(name => {
      if (state.inventory[name] > 0) {
        const item = ITEMS.find(i => i.name === name);
        if (item && item.price > maxPrice) {
          maxPrice = item.price;
          most = item;
        }
      }
    });
    return most;
  }, [state.inventory]);

  const leaderboard = loadLeaderboard();

  return {
    ...state,
    toasts,
    buyItem,
    sellItem,
    getMaxBuyable,
    toggleSound,
    resetGame,
    getMostExpensiveOwned,
    leaderboard,
  };
}
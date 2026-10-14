import React, { useState } from 'react';
import { Project } from '../types';
import { 
  X, 
  ExternalLink, 
  Check, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  Layers, 
  Code2, 
  Play, 
  Sparkles,
  Send,
  ThumbsUp,
  Copy
} from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  isDark: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'architecture' | 'highlights'>('interactive');

  // E-commerce interactive state
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: number; qty: number }[]>([
    { id: '1', name: 'Keychron Mechanical Keyboard', price: 89, qty: 1 }
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // TaskMatrix interactive state
  const [tasks, setTasks] = useState<{ id: string; title: string; col: 'backlog' | 'in_progress' | 'review' | 'done'; priority: 'High' | 'Med' | 'Normal' }[]>([
    { id: 't1', title: 'Implement JWT Auth Middleware', col: 'done', priority: 'High' },
    { id: 't2', title: 'Design Product Filtering UI', col: 'in_progress', priority: 'Med' },
    { id: 't3', title: 'Write MongoDB Indexing Script', col: 'backlog', priority: 'Normal' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // DevConnect interactive state
  const [upvotes, setUpvotes] = useState<Record<string, number>>({
    'dev-p1': 42,
    'dev-p2': 28
  });
  const [hasUpvoted, setHasUpvoted] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<string[]>([
    'Great clean architecture in the Express route handlers! – Senior Reviewer',
    'Tested the API response time on Postman, latency is under 90ms. Impressive work!'
  ]);
  const [commentInput, setCommentInput] = useState('');

  // Snippet interactive state
  const [selectedLang, setSelectedLang] = useState<'java' | 'js' | 'c'>('java');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  if (!project) return null;

  // E-commerce actions
  const addToCart = (product: { id: string; name: string; price: number }) => {
    setOrderPlaced(false);
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartSubtotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const finalTotal = discountApplied ? Math.round(cartSubtotal * 0.8) : cartSubtotal;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ANAND2028' || promoCode.trim().toUpperCase() === 'INTERN') {
      setDiscountApplied(true);
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setCartItems([]);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // TaskMatrix actions
  const moveTask = (taskId: string, targetCol: 'backlog' | 'in_progress' | 'review' | 'done') => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, col: targetCol } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks(prev => [
      ...prev,
      {
        id: `t-${Date.now()}`,
        title: newTaskTitle.trim(),
        col: 'backlog',
        priority: 'Med'
      }
    ]);
    setNewTaskTitle('');
  };

  // DevConnect actions
  const handleToggleUpvote = (id: string) => {
    const isVoted = hasUpvoted[id];
    setUpvotes(prev => ({
      ...prev,
      [id]: isVoted ? prev[id] - 1 : prev[id] + 1
    }));
    setHasUpvoted(prev => ({ ...prev, [id]: !isVoted }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments(prev => [...prev, commentInput.trim()]);
    setCommentInput('');
  };

  // Snippets
  const codeSnippets = {
    java: `// Java: Binary Search Implementation (O(log N))
public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1; // Not found
    }
}`,
    js: `// JavaScript: Express.js REST API Endpoint
app.post('/api/projects', authMiddleware, async (req, res) => {
  try {
    const { title, description, tags, repoUrl } = req.body;
    const project = await Project.create({
      title,
      description,
      tags,
      repoUrl,
      authorId: req.user.id
    });
    return res.status(201).json({ success: true, project });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});`,
    c: `// C Language: Dynamic Array & Pointer Allocation
#include <stdio.h>
#include <stdlib.h>

int* createIntArray(int size) {
    int* ptr = (int*)malloc(size * sizeof(int));
    if (ptr == NULL) {
        fprintf(stderr, "Memory allocation failed\\n");
        exit(1);
    }
    return ptr;
}`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[selectedLang]);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl my-auto rounded-2xl border shadow-2xl overflow-hidden transition-all max-h-[90vh] flex flex-col ${
          isDark ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 ${
          isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-500 mb-1">
              <span>{project.category} Showcase</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">Class of 2028</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              {project.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isDark 
                  ? 'border-neutral-700 bg-neutral-800 text-neutral-200 hover:text-white' 
                  : 'border-neutral-300 bg-white text-neutral-700 hover:text-neutral-900'
              }`}
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Source Code</span>
            </a>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className={`flex border-b px-5 sm:px-6 gap-2 text-xs font-medium ${
          isDark ? 'border-neutral-800 bg-neutral-950/40' : 'border-neutral-200 bg-neutral-100/60'
        }`}>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'interactive'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Live Prototype</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('highlights')}
            className={`py-3 px-3 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'highlights'
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Key Engineering Highlights</span>
          </button>
        </div>

        {/* Modal Body Content (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: INTERACTIVE PROTOTYPE */}
          {activeTab === 'interactive' && (
            <div className="space-y-6">
              <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  Interactive sandbox compiled into the portfolio. You can click and test the full client-state logic directly.
                </span>
              </div>

              {/* IF E-COMMERCE */}
              {project.interactiveType === 'ecommerce' && (
                <div className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/40">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      SwiftCart Live Storefront
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      Cart ({cartItems.reduce((acc, c) => acc + c.qty, 0)}) · Total: ${finalTotal}
                    </span>
                  </div>

                  {orderPlaced ? (
                    <div className="p-6 text-center space-y-2 rounded-lg bg-emerald-950/20 border border-emerald-800/40">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-emerald-400">Order Simulated Successfully!</h4>
                      <p className="text-xs text-neutral-400">
                        Cart state reset, simulated webhook received, and invoice recorded.
                      </p>
                      <button
                        onClick={() => setOrderPlaced(false)}
                        className="mt-2 text-xs text-blue-400 underline"
                      >
                        Start another shopping test
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Catalog items */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-neutral-400">Sample Catalog:</div>
                        {[
                          { id: '1', name: 'Keychron Mechanical Keyboard', price: 89 },
                          { id: '2', name: 'Ergonomic Desk Mat XXL', price: 29 },
                          { id: '3', name: 'Noise-Cancelling Dev Headphones', price: 149 },
                          { id: '4', name: 'Software Engineer Hoodie', price: 45 }
                        ].map(prod => (
                          <div 
                            key={prod.id}
                            className={`p-2.5 rounded-lg border flex items-center justify-between text-xs ${
                              isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{prod.name}</div>
                              <div className="font-mono text-neutral-400">${prod.price}</div>
                            </div>
                            <button
                              onClick={() => addToCart(prod)}
                              className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Live Cart & Total */}
                      <div className={`p-3 rounded-lg border space-y-3 ${
                        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                      }`}>
                        <div className="text-xs font-medium text-neutral-400 flex items-center justify-between">
                          <span>Active Cart Contents:</span>
                          <span className="font-mono">{cartItems.length} items</span>
                        </div>

                        {cartItems.length === 0 ? (
                          <div className="text-xs text-neutral-500 py-6 text-center">
                            Cart is empty. Add products from the catalog.
                          </div>
                        ) : (
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {cartItems.map(item => (
                              <div key={item.id} className="flex items-center justify-between text-xs border-b border-neutral-800/40 pb-1.5">
                                <div className="truncate pr-2">
                                  <span>{item.name}</span>
                                  <span className="text-neutral-400 ml-1">× {item.qty}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <span className="font-mono font-medium">${item.price * item.qty}</span>
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-neutral-500 hover:text-red-400"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Promo code */}
                        <form onSubmit={handleApplyPromo} className="flex gap-1.5 pt-1">
                          <input
                            type="text"
                            placeholder="Try promo code ANAND2028"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className={`flex-1 px-2.5 py-1 text-xs rounded border ${
                              isDark ? 'bg-neutral-950 border-neutral-700 text-neutral-200' : 'bg-neutral-50 border-neutral-300'
                            }`}
                          />
                          <button
                            type="submit"
                            className="px-2.5 py-1 text-xs font-medium rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                          >
                            Apply
                          </button>
                        </form>
                        {discountApplied && (
                          <div className="text-[11px] text-emerald-400">
                            ✓ 20% Discount code applied!
                          </div>
                        )}

                        {/* Checkout trigger */}
                        <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                          <div>
                            <div className="text-[10px] text-neutral-400 uppercase">Total:</div>
                            <div className="text-sm font-bold font-mono text-emerald-400">${finalTotal}</div>
                          </div>
                          <button
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-colors"
                          >
                            Simulate Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* IF TASK MATRIX */}
              {project.interactiveType === 'taskmatrix' && (
                <div className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800/40">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      TaskMatrix Sprint Simulator
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      Active Sprint: 3 Tasks
                    </span>
                  </div>

                  {/* Add Task form */}
                  <form onSubmit={addTask} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new engineering ticket..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className={`flex-1 px-3 py-1.5 text-xs rounded-lg border ${
                        isDark ? 'bg-neutral-900 border-neutral-700 text-neutral-200' : 'bg-white border-neutral-300'
                      }`}
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
                    >
                      Add Ticket
                    </button>
                  </form>

                  {/* 3 Columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* Backlog */}
                    <div className={`p-3 rounded-lg border ${
                      isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200'
                    }`}>
                      <div className="text-xs font-semibold text-neutral-400 mb-2 flex justify-between">
                        <span>Backlog</span>
                        <span>{tasks.filter(t => t.col === 'backlog').length}</span>
                      </div>
                      <div className="space-y-2">
                        {tasks.filter(t => t.col === 'backlog').map(t => (
                          <div key={t.id} className="p-2 rounded bg-neutral-800/80 border border-neutral-700 text-xs space-y-1.5">
                            <div className="font-medium text-neutral-200">{t.title}</div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-amber-400 font-mono">{t.priority}</span>
                              <button
                                onClick={() => moveTask(t.id, 'in_progress')}
                                className="text-[10px] text-blue-400 hover:underline"
                              >
                                Move In Progress →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* In Progress */}
                    <div className={`p-3 rounded-lg border ${
                      isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200'
                    }`}>
                      <div className="text-xs font-semibold text-blue-400 mb-2 flex justify-between">
                        <span>In Progress</span>
                        <span>{tasks.filter(t => t.col === 'in_progress').length}</span>
                      </div>
                      <div className="space-y-2">
                        {tasks.filter(t => t.col === 'in_progress').map(t => (
                          <div key={t.id} className="p-2 rounded bg-neutral-800/80 border border-neutral-700 text-xs space-y-1.5">
                            <div className="font-medium text-neutral-200">{t.title}</div>
                            <div className="flex items-center justify-between pt-1">
                              <button
                                onClick={() => moveTask(t.id, 'backlog')}
                                className="text-[10px] text-neutral-400 hover:underline"
                              >
                                ← Backlog
                              </button>
                              <button
                                onClick={() => moveTask(t.id, 'done')}
                                className="text-[10px] text-emerald-400 hover:underline"
                              >
                                Done ✓
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Completed */}
                    <div className={`p-3 rounded-lg border ${
                      isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200'
                    }`}>
                      <div className="text-xs font-semibold text-emerald-400 mb-2 flex justify-between">
                        <span>Completed</span>
                        <span>{tasks.filter(t => t.col === 'done').length}</span>
                      </div>
                      <div className="space-y-2">
                        {tasks.filter(t => t.col === 'done').map(t => (
                          <div key={t.id} className="p-2 rounded bg-neutral-800/80 border border-emerald-900/40 text-xs space-y-1">
                            <div className="line-through text-neutral-400">{t.title}</div>
                            <span className="text-[10px] text-emerald-500 font-mono">Shipped</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* IF DEVCONNECT */}
              {project.interactiveType === 'devconnect' && (
                <div className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800/40">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      DevConnect Feed & Discussion Simulator
                    </span>
                    <span className="text-xs text-blue-400 font-medium">BIRT Student Dev Community</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Featured Student Project Post */}
                    <div className={`p-3 rounded-lg border space-y-2.5 ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                    }`}>
                      <div className="text-xs font-semibold text-neutral-200">
                        Smart Campus Navigation & Class Schedule App
                      </div>
                      <p className="text-xs text-neutral-400">
                        Built for Bansal Institute campus to help 1st-year students locate lecture halls and lab facilities in real time.
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-neutral-800/40">
                        <button
                          onClick={() => handleToggleUpvote('dev-p1')}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                            hasUpvoted['dev-p1']
                              ? 'bg-blue-600 text-white'
                              : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{upvotes['dev-p1']} Upvotes</span>
                        </button>
                        <span className="text-[11px] text-neutral-500">React · Leaflet · Node</span>
                      </div>
                    </div>

                    {/* Peer Comments Thread */}
                    <div className={`p-3 rounded-lg border flex flex-col justify-between space-y-3 ${
                      isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                    }`}>
                      <div className="space-y-2 max-h-36 overflow-y-auto">
                        <div className="text-xs font-medium text-neutral-400">Peer Feedback:</div>
                        {comments.map((c, i) => (
                          <div key={i} className="text-xs p-2 rounded bg-neutral-950/60 border border-neutral-800 text-neutral-300">
                            {c}
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleAddComment} className="flex gap-1.5 pt-2 border-t border-neutral-800/40">
                        <input
                          type="text"
                          placeholder="Write feedback as a recruiter/peer..."
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          className={`flex-1 px-2.5 py-1 text-xs rounded border ${
                            isDark ? 'bg-neutral-950 border-neutral-700 text-neutral-200' : 'bg-neutral-50 border-neutral-300'
                          }`}
                        />
                        <button
                          type="submit"
                          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* IF PASTEBIN / DEFAULT SNIPPET VIEWER */}
              {(project.interactiveType === 'pastebin' || !project.interactiveType) && (
                <div className={`p-4 rounded-xl border space-y-3 ${
                  isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                }`}>
                  <div className="flex items-center justify-between">
                    {/* Language Switch */}
                    <div className="flex items-center gap-1.5 p-1 rounded-lg bg-neutral-900 border border-neutral-800">
                      {(['java', 'js', 'c'] as const).map(lang => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLang(lang)}
                          className={`px-2.5 py-1 rounded text-xs font-mono uppercase transition-colors ${
                            selectedLang === lang ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 px-2.5 py-1 rounded text-xs border border-neutral-700 bg-neutral-900 text-neutral-300 hover:text-white"
                    >
                      {copiedSnippet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSnippet ? 'Copied' : 'Copy Snippet'}</span>
                    </button>
                  </div>

                  <pre className="p-3 rounded-lg bg-neutral-950 font-mono text-xs text-neutral-300 overflow-x-auto border border-neutral-800 leading-relaxed">
                    <code>{codeSnippets[selectedLang]}</code>
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SYSTEM ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Technical Stack & Architectural Breakdown
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>

              <div className="space-y-2.5 pt-2">
                {project.architecture.map((arch, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
                      isDark ? 'bg-neutral-950/60 border-neutral-800 text-neutral-300' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                    }`}
                  >
                    <span className="font-mono font-bold text-blue-500 shrink-0">0{idx + 1}.</span>
                    <span>{arch}</span>
                  </div>
                ))}
              </div>

              {/* Stack Tags */}
              <div className="pt-4 border-t border-neutral-800/40">
                <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Technologies Utilized
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  {project.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {i < project.tags.length - 1 && <span className="text-neutral-500">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KEY ENGINEERING HIGHLIGHTS */}
          {activeTab === 'highlights' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Engineering Highlights & Key Milestones
              </h4>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {project.metrics.map((metric, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-xl border text-center ${
                      isDark ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}
                  >
                    <div className="text-[10px] text-neutral-500 uppercase">{metric.label}</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-blue-500 mt-0.5">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights List */}
              <div className="space-y-2.5 pt-2">
                {project.highlights.map((h, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${
                      isDark ? 'bg-neutral-950/40 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-200 text-neutral-800'
                    }`}
                  >
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
        <div className={`p-4 sm:p-5 border-t flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div className="text-xs text-neutral-400">
            Open for code walkthrough or deep-dive during technical interview.
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Inspect on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

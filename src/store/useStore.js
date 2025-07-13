import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      cartTotal: 0,
      
      // Product view preferences
      viewMode: 'grid', // 'grid' or 'list'
      
      // Search and filters
      searchQuery: '',
      selectedCategory: 'all',
      priceRange: [0, 25000],
      sortBy: 'name',
      
      // Add to cart
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity }]
          });
        }
        
        get().updateCartTotal();
      },
      
      // Remove from cart
      removeFromCart: (productId) => {
        const { cart } = get();
        set({
          cart: cart.filter(item => item.id !== productId)
        });
        get().updateCartTotal();
      },
      
      // Update cart item quantity
      updateCartItemQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        });
        get().updateCartTotal();
      },
      
      // Update cart total
      updateCartTotal: () => {
        const { cart } = get();
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        set({ cartTotal: total });
      },
      
      // Clear cart
      clearCart: () => {
        set({ cart: [], cartTotal: 0 });
      },
      
      // Toggle view mode
      toggleViewMode: () => {
        const { viewMode } = get();
        set({ viewMode: viewMode === 'grid' ? 'list' : 'grid' });
      },
      
      // Set view mode
      setViewMode: (mode) => {
        set({ viewMode: mode });
      },
      
      // Search and filter actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },
      
      setPriceRange: (range) => {
        set({ priceRange: range });
      },
      
      setSortBy: (sortBy) => {
        set({ sortBy });
      },
      
      // Get cart item count
      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // Get cart item by ID
      getCartItem: (productId) => {
        const { cart } = get();
        return cart.find(item => item.id === productId);
      }
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({
        cart: state.cart,
        cartTotal: state.cartTotal,
        viewMode: state.viewMode,
        searchQuery: state.searchQuery,
        selectedCategory: state.selectedCategory,
        priceRange: state.priceRange,
        sortBy: state.sortBy
      })
    }
  )
);

export default useStore; 
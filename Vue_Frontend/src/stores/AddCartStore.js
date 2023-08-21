import { defineStore } from "pinia";
export const useAddCartStore = defineStore("addCart", {
  state: () => {
    return {
      cartItems: [],
    };
  },
  getters: {
    Total() {
      return this.cartItems.reduce(
        (acc, item) =>
          (acc +=
            item.price * item.quantity + item.price * item.quantity * 0.05),
        0
      );
    },
    countCartItems() {
      return this.cartItems.length;
    },
    getCartItems() {
      return this.cartItems;
    },
  },
  actions: {
    addToCart(item) {
      let exitItem = this.cartItems.find((product) => product._id === item._id);
      if (exitItem) {
        exitItem.quantity++;
      } else {
        this.cartItems.push({ ...item, quantity: 1 });
      }
    },
    incrementQ(item) {
      let index = this.cartItems.findIndex(
        (product) => product._id === item._id
      );
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      }
    },
    decrementQ(item) {
      let index = this.cartItems.findIndex(
        (product) => product._id === item._id
      );
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems = this.cartItems.filter(
            (product) => product.id !== item.id
          );
        }
      }
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter(
        (product) => product._id !== item._id
      );
    },
  },
});

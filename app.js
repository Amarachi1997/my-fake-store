new Vue({
	el: '#app',
  data: {
    cart: {
      items: []
    },
    isShowingCart: false,
      products: [],
  	navLink: {
          navitem: ['Shop', 'View Cart',  'Blog']
      }
  },
  computed: {
    cartTotal: function() {
        var total = 0;
        this.cart.items.forEach(function(item) {
            total += item.quantity * item.product.price;
        });
        return total;  
    },
    deliveryFee: function(){
      return this.cartTotal / 5;
    }
    
},
  methods:{
    showAllProducts: function(){
        axios
        .get('https://fakestoreapi.com/products')
        .then(response => (this.products = response.data));
        return 
    },
    addProductToCart: function(product){
      var oneProduct = this.collectItem(product);

      if(oneProduct != null){
        oneProduct.quantity++;
      }else{
        this.cart.items.push({
          product: product,
           quantity: 1
       });
      }
     
      product.id--;
    },
    
    collectItem: function(product){
      for (var i = 0; i < this.cart.items.length; i++) {
        if (this.cart.items[i].product.id === product.id) {
          return this.cart.items[i]
        }
      }
      return null;
  },

  increaseQuantity: function(cartItem){
      cartItem.product.id--;
      cartItem.quantity++;
  },
  decreaseQuantity: function(cartItem){
    cartItem.product.id++;
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.removeItem(cartItem)
    }
},
  removeItem: function(cartItem){
   var index = this.cart.items.indexOf(cartItem);

   if (index !== -1) {
     this.cart.items.splice(index, 1);
   }
},
  checkout: function(){
    if (confirm("Ready To checkout?")){
      this.cart.items.forEach(function(item){
        item.product.id += item.quantity;

      });
      this.cart.items = [];
    }
  }

  },
  mounted () {
  
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => (this.products = response.data.slice(0,9)))
      console.log(response.data);
     
     
  },
  filters: {
    currency: function(value){
      var formater = Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      });
      return formater.format(value)
    }
  }

});


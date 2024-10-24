const express = require('express');
const { createAdminUser, createUser, getAllUsers, getUserById, updateUserById, deleteUserById, dashBoard, loginWithMobileNo, verifyOtp, generateOtp, verifyGenerateOtp, resentOtp, staticResentOtp } = require('../controller/userController');
const upload = require('../helper/imageUplode');
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controller/categoryController');
const { createSubCategory, getAllSubCategory, getSubCategoryById, updateSubCategoryById, deleteSubCategoryById } = require('../controller/subCategoryController');
const { createProduct, getAllProduct, getProductById, updateProductById, deleteProductById, getProductByCategory } = require('../controller/productContoller');
const { createWishList, getAllWishList, getWishListById, deleteWishListById, getAllMyWishList } = require('../controller/wishListController');
const { createAddress, getAllAddress, getAddressById, deleteAddressById, updateAddressById } = require('../controller/addressController');
const { createCartData, getAllCartData, getCartDataById, updateCartDataById, updateCartQuantityById, deleteCartDataById, getAllMyCarts } = require('../controller/cartController');
const { createRating, getAllRatings, getRatingDataById, updateRatingDataById, deleteRatingDataById } = require('../controller/ratingController');
const { createCoupen, getAllCoupens, getCoupenById, updateCoupenById, updateCoupenStatusById, deleteCoupenById } = require('../controller/coupenContoller');
const { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById, getMyOrders, changeOrderStatusById, cancelOrder } = require('../controller/orderController');
const { userLogin } = require('../auth/login');
const { auth } = require('../helper/authToken');
const { createSpecialDeals, getAllSpecialDeals, getSpecialDealById, updateSpecialDealById, deleteSpecialDealById } = require('../controller/specialDealsController');
const { createMoreToExplore, getAllMoreToExplores, getMoreToExploreById, updateMoretoExploreById, deleteMoreToExploreById } = require('../controller/moreToExpolre.contoller');

const indexRoutes = express.Router();

// login

indexRoutes.post('/login', userLogin)

// User Routes

indexRoutes.post('/createAdminUser', upload.single('image'), createAdminUser)
indexRoutes.post('/createUser', upload.single('image'), createUser)
indexRoutes.get('/allUsers', getAllUsers)
indexRoutes.get('/getUser/:id', getUserById);
indexRoutes.put('/updateUser/:id', upload.single('image'), updateUserById)
indexRoutes.delete('/deleteUser/:id', deleteUserById);
indexRoutes.get('/dashBoard', dashBoard);

// category routes 

indexRoutes.post('/createCategory', upload.fields([{ name: 'categoryImage' }, { name: 'vectorImage' }]), createCategory);
indexRoutes.get('/AllCategory', getAllCategories);
indexRoutes.get('/getCategory/:id', getCategoryById);
indexRoutes.put('/updateCategory/:id', upload.fields([{ name: 'categoryImage' }, { name: 'vectorImage' }]), updateCategoryById);
indexRoutes.delete('/deleteCategory/:id', deleteCategoryById);

// Sub Category Routes

indexRoutes.post('/createSubCategory', upload.single('subCategoryImage'), createSubCategory);
indexRoutes.get('/AllSubCategory', getAllSubCategory);
indexRoutes.get('/getSubCategory/:id', getSubCategoryById)
indexRoutes.put('/updateSubCategory/:id', upload.single('subCategoryImage'), updateSubCategoryById);
indexRoutes.delete('/deleteSubCategory/:id', deleteSubCategoryById)

// Product Routes

indexRoutes.post('/createProducts', upload.fields([{ name: 'productImage' }]), createProduct);
indexRoutes.get('/allProduct', getAllProduct);
indexRoutes.get('/getProduct/:id', getProductById);
indexRoutes.put('/updateProduct/:id', upload.fields([{ name: 'productImage' }]), updateProductById);
indexRoutes.delete('/deleteProduct/:id', deleteProductById);
indexRoutes.get('/getProductByCategory/:id', getProductByCategory)

// wishList Routes

indexRoutes.post('/createWishList', createWishList)
indexRoutes.get('/allWishList', getAllWishList)
indexRoutes.get('/getWishList/:id', getWishListById)
indexRoutes.delete('/deleteWishList/:id', deleteWishListById);
indexRoutes.get('/allMyWishList/:id', getAllMyWishList);

// Delivery address Routes

indexRoutes.post('/createDeliveryAddress', createAddress);
indexRoutes.get('/allAddress', getAllAddress);
indexRoutes.get('/getAddress/:id', getAddressById);
indexRoutes.put('/updateAddress/:id', updateAddressById)
indexRoutes.delete('/deleteAddress/:id', deleteAddressById);


// Cart Routes

indexRoutes.post('/addToCart', createCartData);
indexRoutes.get('/allCarts', getAllCartData);
indexRoutes.get('/getCart/:id', getCartDataById);
indexRoutes.put('/updateCart/:id', updateCartDataById);
indexRoutes.put('/updateCartQuantity/:id', updateCartQuantityById);
indexRoutes.delete('/deleteCart/:id', deleteCartDataById);
indexRoutes.get('/allMyCarts/:id', getAllMyCarts);

// Rating Routes

indexRoutes.post('/createRating', createRating);
indexRoutes.get('/allRating', getAllRatings);
indexRoutes.get('/getRating/:id', getRatingDataById)
indexRoutes.put('/updateRating/:id', updateRatingDataById);
indexRoutes.delete('/deleteRating/:id', deleteRatingDataById);

// coupen Routes 

indexRoutes.post('/createCoupen', upload.single('coupenImage'), createCoupen);
indexRoutes.get('/allCoupens', getAllCoupens);
indexRoutes.get('/getCoupen/:id', getCoupenById);
indexRoutes.put('/updateCoupen/:id', upload.single('coupenImage'), updateCoupenById);
indexRoutes.put('/updateCoupenStatus/:id', updateCoupenStatusById);
indexRoutes.delete('/deleteCoupen/:id', deleteCoupenById)

// Order Routes 

indexRoutes.post('/createOrder', createOrder)
indexRoutes.get('/allOrders', getAllOrders)
indexRoutes.get('/getOrder/:id', getOrderById)
indexRoutes.put('/updateOrder/:id', updateOrderById);
indexRoutes.delete('/deleteOrder/:id', deleteOrderById);
indexRoutes.get('/getMyOrder/:id', getMyOrders)
indexRoutes.put('/changeOrderStatus/:id', changeOrderStatusById);
indexRoutes.put('/cancelOrder/:id', cancelOrder);

// Special Deals Routes

indexRoutes.post('/createSpecialDeal', createSpecialDeals);
indexRoutes.get('/allSpecialDeal', getAllSpecialDeals);
indexRoutes.get('/getSpecialDeal/:id', getSpecialDealById)
indexRoutes.put('/updateSpecialDeal/:id', updateSpecialDealById);
indexRoutes.delete('/deleteSpecialDeal/:id', deleteSpecialDealById);

// moreToExlpre Routes

indexRoutes.post('/createMoreToExplore', upload.single('moreToExploreImage'), createMoreToExplore);
indexRoutes.get('/getAllMoreToExplore', getAllMoreToExplores);
indexRoutes.get('/getMoreToExplore/:id', getMoreToExploreById);
indexRoutes.put('/updateMoreToExplore/:id', upload.single('moreToExploreImage'), updateMoretoExploreById);
indexRoutes.delete('/deleteMoreToExplore/:id', deleteMoreToExploreById);

// Login With Mobile No

indexRoutes.post('/mobileNoLogin', loginWithMobileNo);
indexRoutes.post('/verifyOtp', verifyOtp);
indexRoutes.post('/staticResendotp', staticResentOtp);


indexRoutes.post('/generateOtp', generateOtp);
indexRoutes.post('/verifyGenereOtp', verifyGenerateOtp);
indexRoutes.post('/resentOtp', resentOtp);


module.exports = indexRoutes;   
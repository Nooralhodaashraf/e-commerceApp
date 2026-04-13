// App Structure:
//// home 
//// Address
//// brand 
////all products   |||||||||||||||||||
//// cart (/add/ - /delete/ - clear - get - -/update/-)      |||||||||||
//// categories  ||||||||||||||
//! contact us 
//// login 
//// not found 
//// orders 
//// profile 
//// register ||||||||||||||||||
//// setting 
////checkout||||||||||||||||||
//// wishlist 
//// shop |||||||||||||||||||
////details||||||||||||||||||||
////changePassword ----- resendCode |||||||||||||||||||
////review 
////setting
////address

//used api's:
////get catigories 
////get spcific catigory  https://ecommerce.routemisr.com
//! SubCategories
//! Get All SubCategories
//! Get specific SubCategory
// !Get All SubCategories On Category
//// Brands https://ecommerce.routemisr.com/api/v1/brands
//// Get All Brands
//// Get specific brand https://ecommerce.routemisr.com/api/v1/brands/64089ceb24b25627a2531596
//// Products
//// Get All Products
//// Get specific Product
//// Signup
// //signin
// //Forgot Password
//// Verify Reset Code
//// Reset Password
//// Wishlist https://ecommerce.routemisr.com/api/v1/wishlist
//// Add product to wishlist https://ecommerce.routemisr.com/api/v1/wishlist   {"productId": "6428ebc6dc1175abc65ca0b9"} ---post
//// Remove product from wishlist https://ecommerce.routemisr.com/api/v1/wishlist/61e81f641904360ec15c6db1
//// Get logged user wishlist  https://ecommerce.routemisr.com/api/v1/wishlist
//// User Addresses 
//// Add address https://ecommerce.routemisr.com/api/v1/addresses -- post --{"name": "Home","details": "Home details","phone": "01010700700","city": "Gizaa"}
//// Remove address  https://ecommerce.routemisr.com/api/v1/addresses/62289d4d66fbb7edb6b5cab7
//// Get specific address
//// Get logged user addresses
//// Cart (v2)
//// Add Product To Cart (v2)
//// Update Cart Product Quantity (v2)
//// Remove Product From Cart (v2)
//// Clear User Cart (v2)
//// Get Reviews For Product (nested)
//// https://ecommerce.routemisr.com/api/v1/products/{{productId}}/reviews
// GET
//! Get All Reviews
//! https://ecommerce.routemisr.com/api/v1/reviews
//! GET
// !Get Review By Id
// !https://ecommerce.routemisr.com/api/v1/reviews/{{reviewId}}
// !Example Request
// !Get Review By Id
// !PUT
// !Update Review (owner only)
// !https://ecommerce.routemisr.com/api/v1/reviews/{{reviewId}}
// !DELETE
// !Delete Review (owner/admin)
// !https://ecommerce.routemisr.com/api/v1/reviews/{{reviewId}}


//// getAllOrders
//// https://ecommerce.routemisr.com/api/v1/orders/
//// getAllOrders

//// getUserOrders
//// https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17
//// Example Request

//// Checkout session
//// https://ecommerce.routemisr.com/api/v1/orders/checkout-session/67b210df429eb834606c7a30?url=http://localhost:3000

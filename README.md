### ALL APIS

### NOT: .env contents:
- JWT_SECURITY=JWT_KEY
- EMAIL_PW=YOUR_MAIL_PW
- EMAIL_FROM=YOUR_MAIL_GMAIL_SMTP
- PAS_SECURITY=JWT_SECRET_KEY
- DB_URL=YOUR_DB_URL

<img width="366" height="650" alt="Ekran Resmi 2022-07-06 02 10 57" src="https://user-images.githubusercontent.com/13710309/177431716-821ffde1-81f6-4374-b147-6ee1f30f2a79.png">


### LOGIN
> POST: localhost:3000/ugurapi/auth/login</br>
<img width="1175" height="400" alt="Ekran Resmi 2022-07-06 01 00 12" src="https://user-images.githubusercontent.com/13710309/177425109-160f5065-c09a-49db-8ead-0b7205e17348.png">

### REGISTER
> POST: localhost:3000/ugurapi/auth/register</br>
<img width="1148" height="400" alt="Ekran Resmi 2022-07-06 01 12 16" src="https://user-images.githubusercontent.com/13710309/177425819-dd8a0fb4-a821-41a9-92a8-4679f1423e1a.png">

### USER DETAIL ( With token )
> GET: localhost:3000/ugurapi/users/62b7415c4e4b14a73a91aeff</br>
<img width="1148" height="400" alt="Ekran Resmi 2022-07-06 01 19 26" src="https://user-images.githubusercontent.com/13710309/177426562-bca22c65-39b1-4876-ab65-b19ec0d73d26.png">

### USER-UPDATE ( With token )
> PUT: localhost:3000/ugurapi/users/update-user/62b7415c4e4b14a73a91aeff
<img width="1002"  height= "450" alt="Ekran Resmi 2022-07-06 01 23 56" src="https://user-images.githubusercontent.com/13710309/177427106-5303e7de-58f1-4b95-8e44-3cc85cb07a34.png">

____
### ONE PRODUCT
> GET: localhost:3000/ugurapi/product/62b8d939fe9ee9f2c47160cf
<img width="1159" height= "400" alt="Ekran Resmi 2022-07-06 01 26 45" src="https://user-images.githubusercontent.com/13710309/177427415-3c09519f-be42-4bf1-8fbe-dfb59061b9bb.png">

### ALL PRODUCT
> GET: localhost:3000/ugurapi/product/all
<img width="1169"  height= "400" alt="Ekran Resmi 2022-07-06 01 31 35" src="https://user-images.githubusercontent.com/13710309/177427929-d5d973bb-80e6-405a-8371-650217dfc7ea.png">

### ADD PRODUCT ( With Token )
> POST: localhost:3000/ugurapi/product/add-product
<img width="1006" height="400" alt="Ekran Resmi 2022-07-06 01 35 58" src="https://user-images.githubusercontent.com/13710309/177428379-2cf96e21-e0ac-4c0d-b0e0-8a6a8e4a44cb.png">

_______

### CREATE CART ITEMS (With Token )
> POST: localhost:3000/ugurapi/carts
<img width="976" height="400" alt="Ekran Resmi 2022-07-06 01 38 39" src="https://user-images.githubusercontent.com/13710309/177428626-071f6c7a-559b-4dd8-9a31-d67b3acc10d7.png">

###  GET USERT CART ITEMS ( With Token )
> GET: localhost:3000/ugurapi/carts/user-id/62b7415c4e4b14a73a91aeff
<img width="1019" height="400" alt="Ekran Resmi 2022-07-06 01 39 43" src="https://user-images.githubusercontent.com/13710309/177428762-7f84448e-9580-4210-913b-fa1206488857.png">

### UPDATE USERT CART ITEMS (With token )
> PUT: localhost:3000/ugurapi/carts/update/cartId/62bf02d0d5b709a8ec87de84
<img width="1019" height="400"  alt="Ekran Resmi 2022-07-06 01 49 11" src="https://user-images.githubusercontent.com/13710309/177429634-40c07884-033b-4767-8461-4bb279268a23.png">


### DELETE USER CART ( Token )
> DELETE : localhost:3000/ugurapi/carts/delete-all/cartId/62bf827a11bd359b918748fb
<img width="1018" alt="Ekran Resmi 2022-07-06 01 50 45" src="https://user-images.githubusercontent.com/13710309/177429769-4d3a27b1-4abe-4d0e-a7ff-b07595c47c85.png">

### DELETE USER CART ITEMS ( Token )
> DELETE : localhost:3000/ugurapi/carts/delete-product?itemId=62bdcbe8486e163570c7e099
<img width="1035" height="400" alt="Ekran Resmi 2022-07-06 02 01 55" src="https://user-images.githubusercontent.com/13710309/177430856-1e2a669b-014d-42b2-b6c5-1d53fe99a602.png">

_______
### ALL CATEGORIES
> GET: localhost:3000/ugurapi/category/get-all
<img width="1045" height="400" alt="Ekran Resmi 2022-07-06 02 05 59" src="https://user-images.githubusercontent.com/13710309/177431209-a42e107b-8134-4b7e-8372-c8967541b096.png">

### GET ONE CATEGORY
> GET: localhost:3000/ugurapi/category/62b8ce863c3719e64bbb3ad1
<img width="837" alt="Ekran Resmi 2022-07-06 02 07 18" src="https://user-images.githubusercontent.com/13710309/177431356-938b4f27-2be7-4161-a1b2-188ebe139f7e.png">


### ADD CATEGORY ( Only ADMIN )
> POST: localhost:3000/ugurapi/category/create
<img width="904" alt="Ekran Resmi 2022-07-06 02 09 01" src="https://user-images.githubusercontent.com/13710309/177431490-95d01058-79cc-4699-be67-affef7cc9413.png">

=======

<img width="366" height="520" alt="Ekran Resmi 2022-07-06 02 10 57" src="https://user-images.githubusercontent.com/13710309/177431716-821ffde1-81f6-4374-b147-6ee1f30f2a79.png">

### LOGIN

> POST: localhost:3000/ugurapi/auth/login</br>
> <img width="1175" height="400" alt="Ekran Resmi 2022-07-06 01 00 12" src="https://user-images.githubusercontent.com/13710309/177425109-160f5065-c09a-49db-8ead-0b7205e17348.png">

### REGISTER

> POST: localhost:3000/ugurapi/auth/register</br>
> <img width="1148" height="400" alt="Ekran Resmi 2022-07-06 01 12 16" src="https://user-images.githubusercontent.com/13710309/177425819-dd8a0fb4-a821-41a9-92a8-4679f1423e1a.png">

### USER DETAIL ( With token )

> GET: localhost:3000/ugurapi/users/62b7415c4e4b14a73a91aeff</br>
> <img width="1148" height="400" alt="Ekran Resmi 2022-07-06 01 19 26" src="https://user-images.githubusercontent.com/13710309/177426562-bca22c65-39b1-4876-ab65-b19ec0d73d26.png">

### USER-UPDATE ( With token )

> PUT: localhost:3000/ugurapi/users/update-user/62b7415c4e4b14a73a91aeff
> <img width="1002"  height= "450" alt="Ekran Resmi 2022-07-06 01 23 56" src="https://user-images.githubusercontent.com/13710309/177427106-5303e7de-58f1-4b95-8e44-3cc85cb07a34.png">

---

### ONE PRODUCT

> GET: localhost:3000/ugurapi/product/62b8d939fe9ee9f2c47160cf
> <img width="1159" height= "400" alt="Ekran Resmi 2022-07-06 01 26 45" src="https://user-images.githubusercontent.com/13710309/177427415-3c09519f-be42-4bf1-8fbe-dfb59061b9bb.png">

### ALL PRODUCT

> GET: localhost:3000/ugurapi/product/all
> <img width="1169"  height= "400" alt="Ekran Resmi 2022-07-06 01 31 35" src="https://user-images.githubusercontent.com/13710309/177427929-d5d973bb-80e6-405a-8371-650217dfc7ea.png">

### ADD PRODUCT ( With Token )

> POST: localhost:3000/ugurapi/product/add-product
> <img width="1006" height="400" alt="Ekran Resmi 2022-07-06 01 35 58" src="https://user-images.githubusercontent.com/13710309/177428379-2cf96e21-e0ac-4c0d-b0e0-8a6a8e4a44cb.png">

---

### CREATE CART ITEMS (With Token )

> POST: localhost:3000/ugurapi/carts
> <img width="976" height="400" alt="Ekran Resmi 2022-07-06 01 38 39" src="https://user-images.githubusercontent.com/13710309/177428626-071f6c7a-559b-4dd8-9a31-d67b3acc10d7.png">

### GET USERT CART ITEMS ( With Token )

> GET: localhost:3000/ugurapi/carts/user-id/62b7415c4e4b14a73a91aeff
> <img width="1019" height="400" alt="Ekran Resmi 2022-07-06 01 39 43" src="https://user-images.githubusercontent.com/13710309/177428762-7f84448e-9580-4210-913b-fa1206488857.png">

### UPDATE USERT CART ITEMS (With token )

> PUT: localhost:3000/ugurapi/carts/update/cartId/62bf02d0d5b709a8ec87de84
> <img width="1019" height="400"  alt="Ekran Resmi 2022-07-06 01 49 11" src="https://user-images.githubusercontent.com/13710309/177429634-40c07884-033b-4767-8461-4bb279268a23.png">

### DELETE USER CART ( Token )

> DELETE : localhost:3000/ugurapi/carts/delete-all/cartId/62bf827a11bd359b918748fb
> <img width="1018" alt="Ekran Resmi 2022-07-06 01 50 45" src="https://user-images.githubusercontent.com/13710309/177429769-4d3a27b1-4abe-4d0e-a7ff-b07595c47c85.png">

### DELETE USER CART ITEMS ( Token )

> DELETE : localhost:3000/ugurapi/carts/delete-product?itemId=62bdcbe8486e163570c7e099
> <img width="1035" height="400" alt="Ekran Resmi 2022-07-06 02 01 55" src="https://user-images.githubusercontent.com/13710309/177430856-1e2a669b-014d-42b2-b6c5-1d53fe99a602.png">

---

### ALL CATEGORIES

> GET: localhost:3000/ugurapi/category/get-all
> <img width="1045" height="400" alt="Ekran Resmi 2022-07-06 02 05 59" src="https://user-images.githubusercontent.com/13710309/177431209-a42e107b-8134-4b7e-8372-c8967541b096.png">

### GET ONE CATEGORY

> GET: localhost:3000/ugurapi/category/62b8ce863c3719e64bbb3ad1
> <img width="837" alt="Ekran Resmi 2022-07-06 02 07 18" src="https://user-images.githubusercontent.com/13710309/177431356-938b4f27-2be7-4161-a1b2-188ebe139f7e.png">

### ADD CATEGORY ( Only ADMIN )

> POST: localhost:3000/ugurapi/category/create
> <img width="904" alt="Ekran Resmi 2022-07-06 02 09 01" src="https://user-images.githubusercontent.com/13710309/177431490-95d01058-79cc-4699-be67-affef7cc9413.png">
>>>>>>> Stashed changes

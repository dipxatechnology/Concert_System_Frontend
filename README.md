# Vibe fest

---

# Frontend

**Visitor (non-registered user):  → Andra**

# Guest

- **Homepage: (** missing some parts **)**
    - Showcase upcoming concerts
    - Feature popular artists or genres
    - Provide search functionality
    - Offer links to registration/login pages
- **Concert Listing Page:  ✅**
    - Display list of available concerts
    - Allow filtering and sorting by various criteria (date, genre, location, etc.)
    - Provide detailed information about each concert
- **Concert Detail Page: ❌**
    - Display comprehensive information about a specific concert
    - Include artist bios, videos, photos, venue maps, seating charts
    - Offer options to purchase tickets (for registered users)
    - Allow adding to wishlists (for registered users)
- **Artist Listing Page: ❌**
    - List all artists featured in upcoming concerts
    - Allow filtering and sorting by genre or popularity
    - Link to artist detail pages
- **Artist Detail Page:❌**
    - Display information about a specific artist
    - Include biography, discography, videos, upcoming concerts, social media links
- **About Us Page:❌**
    - Share information about the company or organization behind the application
- **Contact Page:❌**
    - Provide contact information for customer service or support
    - Offer a contact form or email address
    - Include FAQs
- **Registration Page:❌**
    - Allow new users to create accounts
- **Login Page: ❌**
    - Enable registered users to sign in to their accounts
- **Feedback/Contact Page: ✅**
    - View and manage user feedback
- **Error Pages: ❌**
    - Handle various errors (404, 500, etc.)

## **User (registered user): (task  divide later )**

- **User Dashboard: ❌**
    - View upcoming concerts
    - Manage concert tickets and wishlists
    - View order history
    - Update account settings
- **Ticket Purchase Page: ❌**
    - Facilitate ticket purchase process
- **Wishlist Page: ❌**
    - Manage saved concerts
- **Logout Page:**
    - Allow users to log out of their accounts

## **Admin: → Ethen**

- **Admin Dashboard:❌**
    - Overview of key metrics (concert sales, user activity)
    - Manage concerts (create, edit, delete)
    - Manage artists (create, edit, delete)
    - Manage users (view, edit, delete)
    - Manage orders and payments
    - Manage settings and configurations
- **Concert Creation Page:❌**
    - Add new concerts to the system
- **Artist Creation Page:  ❌**
    - Add new artists to the system
- **User Management Page:❌**
    - Manage user accounts
- **Access Control: ❌**
    - Enforce user roles and permissions
    

---

# backend ( pipo )

## **Visitor (non-registered user)**

- **Homepage:**
    - `/api/homepage` (GET): Retrieve information for the homepage, including upcoming concerts, popular artists, and genres.
- **Concert Listing Page:**
    - `/api/concerts` (GET): Retrieve a list of available concerts.
    - `/api/concerts/filter` (GET): Filter concerts based on criteria like date, genre, location, etc.
    - `/api/concerts/{concertId}` (GET): Retrieve detailed information about a specific concert.
- **Artist Listing Page:**
    - `/api/artists` (GET): Retrieve a list of all artists featured in upcoming concerts.
    - `/api/artists/filter` (GET): Filter artists based on genre or popularity.
    - `/api/artists/{artistId}` (GET): Retrieve detailed information about a specific artist.
- **About Us Page:**
    - `/api/about` (GET): Retrieve information about the company or organization.
- **Contact Page:**
    - `/api/contact` (GET): Retrieve contact information, FAQs, and provide a contact form or email address.
- **Registration Page:**
    - `/api/register` (POST): Allow new users to create accounts.
- **Login Page:**
    - `/api/login` (POST): Enable registered users to sign in to their accounts.

## **User (registered user):**

- **User Dashboard:**
    - `/api/dashboard` (GET): Retrieve information for the user dashboard, including upcoming concerts, ticket information, wishlists, and order history.
    - `/api/settings` (GET, PUT): Retrieve and update user account settings.
- **Ticket Purchase Page:**
    - `/api/tickets/purchase` (POST): Facilitate the ticket purchase process for registered users.
- **Wishlist Page:**
    - `/api/wishlist` (GET, POST, DELETE): Retrieve, add, and remove saved concerts from the user's wishlist.
- **Logout Page:**
    - `/api/logout` (POST): Allow users to log out of their accounts.

## **Admin:**

- **Admin Dashboard:**
    - `/api/admin/dashboard` (GET): Retrieve an overview of key metrics and manage system settings.
- **Concert and Artist Management:**
    - `/api/admin/concerts` (GET, POST, PUT, DELETE): Manage concerts.
    - `/api/admin/artists` (GET, POST, PUT, DELETE): Manage artists.
- **User Management:**
    - `/api/admin/users` (GET, PUT, DELETE): Manage user accounts.
- **Order and Payment Management:**
    - `/api/admin/orders` (GET, PUT): View and manage orders.
    - `/api/admin/payments` (GET, PUT): Manage payments.
- **Access Control:**
    - `/api/admin/roles` (GET, POST, PUT, DELETE): Manage user roles and permissions.
- **Concert and Artist Creation:**
    - `/api/admin/concerts/create` (POST): Add new concerts to the system.
    - `/api/admin/artists/create` (POST): Add new artists to the system.

# Dummy data

## 1. `Homepage` endpoint:

```json
# Homepage
GET /api/homepage
Response:
{
  "upcomingConcerts": [
    {
      "concertId": "1",
      "title": "RockFest 2024",
      "date": "2024-02-15",
      "venue": "StadiumX",
      "artists": [
        {
          "artistId": "101",
          "name": "RockStar Band",
          "genre": "Rock"
        },
        {
          "artistId": "102",
          "name": "Guitar Virtuoso",
          "genre": "Instrumental"
        }
      ]
    },
    {
      "concertId": "2",
      "title": "Pop Explosion",
      "date": "2024-03-01",
      "venue": "ArenaY",
      "artists": [
        {
          "artistId": "103",
          "name": "Pop Diva",
          "genre": "Pop"
        },
        {
          "artistId": "104",
          "name": "Dance Crew",
          "genre": "Electronic"
        }
      ]
    }
  ],
  "popularArtists": [
    {
      "artistId": "105",
      "name": "Acoustic Sensation",
      "genre": "Acoustic"
    },
    {
      "artistId": "106",
      "name": "Jazz Ensemble",
      "genre": "Jazz"
    }
  ],
  "featuredGenres": [
    "Rock",
    "Pop",
    "Electronic",
    "Jazz"
  ]
}

```

In this example:

- `upcomingConcerts` provides details about the upcoming concerts, including `concertId`, `title`, `date`, `venue`, and a list of participating `artists` with their `artistId`, `name`, and `genre`.
- `popularArtists` lists artists that are currently popular, including their `artistId`, `name`, and `genre`.
- `featuredGenres` is an array listing the genres currently featured on the homepage.

## `Concert Listing Page`:

```json
# Concert Listing Page
GET /api/concerts
Response:
{
  "concerts": [
    {
      "concertId": "1",
      "title": "RockFest 2024",
      "date": "2024-02-15",
      "venue": "StadiumX",
      "location": "CityA",
      "artists": [
        {
          "artistId": "101",
          "name": "RockStar Band",
          "genre": "Rock"
        },
        {
          "artistId": "102",
          "name": "Guitar Virtuoso",
          "genre": "Instrumental"
        }
      ],
      "ticketPrice": 30.00,
      "availableTickets": 500
    },
    {
      "concertId": "2",
      "title": "Pop Explosion",
      "date": "2024-03-01",
      "venue": "ArenaY",
      "location": "CityB",
      "artists": [
        {
          "artistId": "103",
          "name": "Pop Diva",
          "genre": "Pop"
        },
        {
          "artistId": "104",
          "name": "Dance Crew",
          "genre": "Electronic"
        }
      ],
      "ticketPrice": 25.00,
      "availableTickets": 300
    },
    // ... more concerts
  ]
}

```

In this example:

- `concerts` provides an array of concert objects, each containing details such as `concertId`, `title`, `date`, `venue`, `location`, a list of participating `artists` with their `artistId`, `name`, and `genre`, `ticketPrice`, and `availableTickets`.

# `Artist Listing Page` and related endpoints:

```json
# Artist Listing Page
GET /api/artists
Response:
{
  "artists": [
    {
      "artistId": "101",
      "name": "RockStar Band",
      "genre": "Rock",
      "popularity": "High",
      "upcomingConcerts": [
        {
          "concertId": "1",
          "title": "RockFest 2024",
          "date": "2024-02-15",
          "venue": "StadiumX"
        },
        // ... more concerts
      ]
    },
    {
      "artistId": "102",
      "name": "Guitar Virtuoso",
      "genre": "Instrumental",
      "popularity": "Medium",
      "upcomingConcerts": [
        {
          "concertId": "1",
          "title": "RockFest 2024",
          "date": "2024-02-15",
          "venue": "StadiumX"
        },
        // ... more concerts
      ]
    },
    // ... more artists
  ]
}

# Filtered Artist Listing Page
GET /api/artists/filter?genre=Pop&popularity=High
Response:
{
  "filteredArtists": [
    {
      "artistId": "103",
      "name": "Pop Diva",
      "genre": "Pop",
      "popularity": "High",
      "upcomingConcerts": [
        {
          "concertId": "2",
          "title": "Pop Explosion",
          "date": "2024-03-01",
          "venue": "ArenaY"
        },
        // ... more concerts
      ]
    },
    // ... more filtered artists
  ]
}

# Artist Detail Page
GET /api/artists/{artistId}
Response:
{
  "artistDetails": {
    "artistId": "101",
    "name": "RockStar Band",
    "genre": "Rock",
    "popularity": "High",
    "biography": "A legendary rock band...",
    "discography": [
      {
        "albumId": "201",
        "title": "Rock Anthem",
        "releaseYear": "2020"
      },
      // ... more albums
    ],
    "videos": [
      {
        "videoId": "301",
        "title": "Live Performance at RockFest 2023",
        "url": "<https://youtube.com/rockstarband>"
      },
      // ... more videos
    ],
    "upcomingConcerts": [
      {
        "concertId": "1",
        "title": "RockFest 2024",
        "date": "2024-02-15",
        "venue": "StadiumX"
      },
      // ... more concerts
    ],
    "socialMediaLinks": {
      "facebook": "<https://facebook.com/rockstarband>",
      "twitter": "<https://twitter.com/rockstarband>"
    }
  }
}

```

In this example:

- `artists` provides an array of artist objects with details such as `artistId`, `name`, `genre`, `popularity`, and a list of their `upcomingConcerts`.
- `filteredArtists` is a filtered list of artists based on parameters like `genre` and `popularity`.
- `artistDetails` provides detailed information about a specific artist, including `biography`, `discography`, `videos`, `upcomingConcerts`, and `socialMediaLinks`.

## `About Us Page`:

```json
# About Us Page
GET /api/about
Response:
{
  "companyInfo": {
    "name": "ConcertHub",
    "description": "Connecting Music Lovers with Unforgettable Concert Experiences",
    "founder": "John Doe",
    "foundedYear": 2010,
    "mission": "To provide a platform that enhances the concert-going experience for fans, artists, and organizers.",
    "team": [
      {
        "name": "Alice Johnson",
        "role": "CEO"
      },
      {
        "name": "Bob Smith",
        "role": "CTO"
      },
      // ... more team members
    ],
    "location": "CityX, CountryY",
    "contact": {
      "email": "info@concerthub.com",
      "phone": "+1234567890",
      "address": "123 Main Street, CityX, CountryY"
    }
  }
}

```

In this example:

- `companyInfo` provides details about the company, including `name`, `description`, `founder`, `foundedYear`, `mission`, `team`, `location`, and `contact` information.
- The `team` array lists team members with their `name` and `role`.
- `contact` provides email, phone, and address details.

# `Registration Page`:

```json
# Registration Page
POST /api/register
Request:
{
  "username": "user123",
  "email": "user123@example.com",
  "password": "password123"
}
Response:
{
  "message": "Registration successful. Please login."
}

```

In this example:

- The `POST` request to `/api/register` includes a JSON payload with `username`, `email`, and `password`.
- The server responds with a JSON object containing a success message, indicating that the registration was successful and prompting the user to log in.

# `Login Page`:

```json
# Login Page
POST /api/login
Request:
{
  "username": "user123",
  "password": "password123"
}
Response:
{
  "token": "your_access_token"
}

```

In this example:

- The `POST` request to `/api/login` includes a JSON payload with `username` and `password`.
- The server responds with a JSON object containing an access token (`token`) after a successful login.

# `User Dashboard` and `Settings` endpoints:

```json
# User Dashboard
GET /api/dashboard
Response:
{
  "upcomingConcerts": [
    {
      "concertId": "1",
      "title": "RockFest 2024",
      "date": "2024-02-15",
      "venue": "StadiumX"
    },
    // ... more upcoming concerts
  ],
  "ticketInfo": [
    {
      "ticketId": "101",
      "concert": {
        "concertId": "1",
        "title": "RockFest 2024",
        "date": "2024-02-15",
        "venue": "StadiumX"
      },
      "seat": "Section A, Row 2, Seat 5",
      "price": 30.00,
      "status": "Confirmed"
    },
    // ... more ticket information
  ],
  "wishlists": [
    {
      "concertId": "2",
      "title": "Pop Explosion",
      "date": "2024-03-01",
      "venue": "ArenaY"
    },
    // ... more wishlist items
  ],
  "orderHistory": [
    {
      "orderId": "201",
      "date": "2024-01-15",
      "totalAmount": 60.00,
      "status": "Completed",
      "items": [
        {
          "ticketId": "102",
          "concert": {
            "concertId": "2",
            "title": "Pop Explosion",
            "date": "2024-03-01",
            "venue": "ArenaY"
          },
          "seat": "Section B, Row 1, Seat 3",
          "price": 25.00
        },
        // ... more items
      ]
    },
    // ... more order history entries
  ]
}

# User Settings
GET /api/settings
Response:
{
  "userSettings": {
    "username": "user123",
    "email": "user123@example.com",
    "notificationPreferences": {
      "email": true,
      "sms": false
    }
  }
}

```

In this example:

- `upcomingConcerts` provides a list of upcoming concerts.
- `ticketInfo` provides information about the user's purchased tickets, including the associated concert details, seat information, price, and status.
- `wishlists` lists concerts added to the user's wishlist.
- `orderHistory` provides a history of the user's past orders, including order details and items.
- `userSettings` provides information about the user's settings, including `username`, `email`, and `notificationPreferences`.

Feel free to adapt this structure based on your actual data model and the specific details you want to include for each section of the user dashboard.

# `Ticket Purchase Page`:

```json
# Ticket Purchase Page
POST /api/tickets/purchase
Request:
{
  "concertId": "123",
  "ticketCount": 2
}
Response:
{
  "message": "Ticket purchase successful."
}

```

In this example:

- The `POST` request to `/api/tickets/purchase` includes a JSON payload with `concertId` and `ticketCount`.
- The server responds with a JSON object containing a success message, indicating that the ticket purchase was successful.

# `Wishlist Page`:

```json
# Wishlist Page
GET /api/wishlist
Response:
{
  "wishlist": [
    {
      "concertId": "456",
      "title": "Jazz Night",
      "date": "2024-02-20",
      "venue": "ClubZ"
    },
    // ... more wishlist items
  ]
}

# Add to Wishlist
POST /api/wishlist
Request:
{
  "concertId": "456"
}
Response:
{
  "message": "Concert added to wishlist."
}

# Remove from Wishlist
DELETE /api/wishlist?concertId=456
Response:
{
  "message": "Concert removed from wishlist."
}

```

In this example:

- `wishlist` provides an array of wishlist items, each containing details such as `concertId`, `title`, `date`, and `venue`.
- The `POST` request to `/api/wishlist` includes a JSON payload with the `concertId` to add a concert to the wishlist.
- The server responds with a JSON object containing a success message indicating that the concert was added to the wishlist.
- The `DELETE` request to `/api/wishlist` includes a query parameter `concertId` to remove a concert from the wishlist.
- The server responds with a JSON object containing a success message indicating that the concert was removed from the wishlist.

# `Logout Page`:

```json
# Logout Page
POST /api/logout
Response:
{
  "message": "Logout successful."
}

```

In this example:

- The `POST` request to `/api/logout` is used to initiate the logout process.
- The server responds with a JSON object containing a success message indicating that the logout was successful.

# `Admin Dashboard`:

```json
# Admin Dashboard
GET /api/admin/dashboard
Response:
{
  "metrics": {
    "totalConcerts": 150,
    "totalArtists": 80,
    "totalUsers": 5000,
    "totalOrders": 1200,
    "totalRevenue": 120000.00
  }
}

```

In this example:

- `metrics` provides various metrics for the admin dashboard, including `totalConcerts`, `totalArtists`, `totalUsers`, `totalOrders`, and `totalRevenue`.
- The values are placeholders, and you can replace them with actual metrics relevant to your application.

# 

 `Concert and Artist Management` endpoints:

```json
# Concert Management
GET /api/admin/concerts
Response:
{
  "concerts": [
    {
      "concertId": "1",
      "title": "RockFest 2024",
      "date": "2024-02-15",
      "venue": "StadiumX",
      "genre": "Rock",
      "artists": [
        {
          "artistId": "101",
          "name": "RockStar Band"
        },
        {
          "artistId": "102",
          "name": "Guitar Virtuoso"
        }
      ]
    },
    // ... more concerts
  ]
}

POST /api/admin/concerts/create
Request:
{
  "title": "New Concert",
  "date": "2024-03-01",
  "venue": "VenueX",
  "artists": [
    {
      "artistId": "103",
      "name": "Pop Diva"
    },
    // ... more artists
  ],
  "genre": "Pop"
}
Response:
{
  "message": "Concert created successfully."
}

PUT /api/admin/concerts/{concertId}
Request:
{
  "title": "Updated Concert Title"
}
Response:
{
  "message": "Concert updated successfully."
}

DELETE /api/admin/concerts/{concertId}
Response:
{
  "message": "Concert deleted successfully."
}

# Artist Management
GET /api/admin/artists
Response:
{
  "artists": [
    {
      "artistId": "101",
      "name": "RockStar Band",
      "genre": "Rock"
    },
    // ... more artists
  ]
}

POST /api/admin/artists/create
Request:
{
  "name": "New Artist",
  "genre": "Jazz",
  "bio": "..."
}
Response:
{
  "message": "Artist created successfully."
}

PUT /api/admin/artists/{artistId}
Request:
{
  "name": "Updated Artist Name"
}
Response:
{
  "message": "Artist updated successfully."
}

DELETE /api/admin/artists/{artistId}
Response:
{
  "message": "Artist deleted successfully."
}

```

In this example:

- `GET /api/admin/concerts` retrieves a list of concerts for management.
- `POST /api/admin/concerts/create` creates a new concert with the provided details.
- `PUT /api/admin/concerts/{concertId}` updates the details of a specific concert.
- `DELETE /api/admin/concerts/{concertId}` deletes a specific concert.
- `GET /api/admin/artists` retrieves a list of artists for management.
- `POST /api/admin/artists/create` creates a new artist with the provided details.
- `PUT /api/admin/artists/{artistId}` updates the details of a specific artist.
- `DELETE /api/admin/artists/{artistId}` deletes a specific artist.

# User Management

GET /api/admin/users
Response:
{
"users": [...]
}

PUT /api/admin/users/{userId}
Request:
{
"role": "Admin"
}
Response:
{
"message": "User role updated successfully."
}

DELETE /api/admin/users/{userId}
Response:
{
"message": "User deleted successfully."
}

`User Management` endpoints:

```json
# User Management
GET /api/admin/users
Response:
{
  "users": [
    {
      "userId": "1",
      "username": "user123",
      "email": "user123@example.com",
      "role": "User"
    },
    // ... more users
  ]
}

PUT /api/admin/users/{userId}
Request:
{
  "role": "Admin"
}
Response:
{
  "message": "User role updated successfully."
}

DELETE /api/admin/users/{userId}
Response:
{
  "message": "User deleted successfully."
}

```

In this example:

- `GET /api/admin/users` retrieves a list of users for management.
- `PUT /api/admin/users/{userId}` updates the role of a specific user.
- `DELETE /api/admin/users/{userId}` deletes a specific user.

# `Order and Payment Management` endpoints:

```json
# Order Management
GET /api/admin/orders
Response:
{
  "orders": [
    {
      "orderId": "1",
      "date": "2024-01-15",
      "totalAmount": 60.00,
      "status": "Pending",
      "items": [
        {
          "ticketId": "101",
          "concert": {
            "concertId": "1",
            "title": "RockFest 2024",
            "date": "2024-02-15",
            "venue": "StadiumX"
          },
          "seat": "Section A, Row 2, Seat 5",
          "price": 30.00
        },
        // ... more items
      ]
    },
    // ... more orders
  ]
}

PUT /api/admin/orders/{orderId}
Request:
{
  "status": "Shipped"
}
Response:
{
  "message": "Order status updated successfully."
}

# Payment Management
GET /api/admin/payments
Response:
{
  "payments": [
    {
      "paymentId": "1",
      "date": "2024-01-15",
      "amount": 60.00,
      "status": "Pending"
    },
    // ... more payments
  ]
}

PUT /api/admin/payments/{paymentId}
Request:
{
  "status": "Paid"
}
Response:
{
  "message": "Payment status updated successfully."
}

```

In this example:

- `GET /api/admin/orders` retrieves a list of orders for management.
- `PUT /api/admin/orders/{orderId}` updates the status of a specific order.
- `GET /api/admin/payments` retrieves a list of payments for management.
- `PUT /api/admin/payments/{paymentId}` updates the status of a specific payment.

# `Access Control` endpoints:

```json
# Access Control
GET /api/admin/roles
Response:
{
  "roles": [
    {
      "roleId": "1",
      "name": "Admin",
      "permissions": ["manageConcerts", "manageArtists", "manageUsers"]
    },
    {
      "roleId": "2",
      "name": "Editor",
      "permissions": ["manageConcerts"]
    },
    // ... more roles
  ]
}

POST /api/admin/roles/create
Request:
{
  "name": "Marketing",
  "permissions": ["viewConcerts", "viewArtists"]
}
Response:
{
  "message": "Role created successfully."
}

PUT /api/admin/roles/{roleId}
Request:
{
  "permissions": ["viewConcerts", "viewArtists", "manageUsers"]
}
Response:
{
  "message": "Role updated successfully."
}

DELETE /api/admin/roles/{roleId}
Response:
{
  "message": "Role deleted successfully."
}

```

In this example:

- `GET /api/admin/roles` retrieves a list of roles for access control.
- `POST /api/admin/roles/create` creates a new role with the provided details.
- `PUT /api/admin/roles/{roleId}` updates the permissions of a specific role.
- `DELETE /api/admin/roles/{roleId}` deletes a specific role.

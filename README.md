# Payment Node

A Node.js application for handling payments using Stripe, including user management and webhook handling.

## Features

- Create and manage payment intents with Stripe
- User CRUD operations
- Stripe webhook integration
- MongoDB database integration

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/Darshit1101/payment-node.git
   cd payment-node
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   APP_DB_URI=mongodb://localhost:27017/payment-node
   STRIPE_TEST_SECRET_KEY=your_stripe_test_secret_key
   STRIPE_TEST_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

## Usage

To start the development server:

```
npm run dev
```

The server will run on the port specified in the `PORT` environment variable (default: 3000).

## API Endpoints

### Stripe

- `POST /payment/v1/stripe/create-intent` - Create a payment intent
- `GET /payment/v1/stripe/payment-status` - Get payment status

### User

- `GET /payment/v1/user` - Get all users
- `GET /payment/v1/user/:id` - Get a user by ID
- `POST /payment/v1/user` - Create a new user
- `PUT /payment/v1/user/:id` - Update a user
- `DELETE /payment/v1/user/:id` - Delete a user

### Webhooks

- Webhook endpoint for Stripe events

## Dependencies

- Express: Web framework
- Mongoose: MongoDB ODM
- Stripe: Payment processing
- CORS: Cross-origin resource sharing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC

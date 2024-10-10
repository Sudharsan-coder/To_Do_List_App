# ToDo List App

A simple ToDo list application built with React Native and GraphQL. This app allows users to create, read, update, and delete tasks seamlessly.

## Features

- Add new tasks
- View existing tasks
- Update task details
- Delete tasks

## Getting Started

### Prerequisites

- Node.js installed on your machine
- React Native environment set up
- GraphQL server running

### Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Start the GraphQL Server**

   Navigate to the server directory and install the dependencies and then run:

   ```bash
   npm start
   ```

3. **Set Up the Client**

   - Create a `.env` file in the root of the client directory.
   - Add the following line to the `.env` file:

     ```
     API_URL=http://localhost:4000
     ```

     **Note:** If you are using an Android emulator or the Expo Go app from a mobile device connected to the same network, replace `localhost` with your local IP address.

4. **Start the Client**

   From the client directory, install the dependencies and run:

   ```bash
   npm start
   ```

## Usage

Once both the server and client are running, you can interact with the ToDo list app. You will be able to add, view, update, and delete tasks from the interface.

## Contributing

Feel free to submit issues and pull requests. Contributions are welcome!

If you have any questions or need further assistance, feel free to reach out!
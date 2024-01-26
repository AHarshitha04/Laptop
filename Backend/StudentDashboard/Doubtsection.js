
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const socketioJwt = require("socketio-jwt");
const mysql = require("mysql");
const db1 = require("../databases/db1");
const router = express.Router();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);







// io.use(
//   socketioJwt.authorize({
//     secret: (request, decodedToken, callback) => {
//       // Fetch the secret key dynamically based on the user from the database
//       const userId = decodedToken.id;

//       db1.query(
//         "SELECT secret_key FROM log WHERE user_id = ?",
//         [userId],
//         (error, results) => {
//           if (error || results.length === 0) {
//             // Handle errors or user not found in the database
//             return callback(null, null);
//           }

//           const secretKey = results[0].secret_key;
//           return callback(null, secretKey);
//         }
//       );
//     },
//     handshake: true,
//   })
// );

// io.on("connection", (socket) => {
//   const userId = socket.decoded_token.id;

//   console.log(`User connected: ${userId}`);

//   socket.on("joinRoom", (room) => {
//     socket.join(room);
//     console.log(`User ${userId} joined room ${room}`);
//   });

//   socket.on("sendMessage", (message) => {
//     io.to(message.room).emit("receiveMessage", {
//       sender: userId,
//       studentcontent: message.studentcontent,
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${userId}`);
//   });
// });
// router.post("/send_message", async (req, res) => {
//   const { senderId, senderusername, studentcontent } = req.body;

//   try {
//     // Save the message to the database
//     const insertQuery =
//       "INSERT INTO messages (sender_id, senderusername, studentcontent) VALUES (?, ?, ?)";
//     db1.query(
//       insertQuery, // Corrected: pass the SQL query string as the first parameter
//       [senderId, senderusername, studentcontent],
//       (error, results) => {
//         if (error) {
//           console.error("Error saving message to database:", error);
//           res.status(500).json({ error: "Failed to save message" });
//         } else {
//           res.status(200).json({ message: "Message sent successfully" });
//         }
//       }
//     );
//   } catch (error) {
//     console.error("Internal server error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });
router.post("/send_message", (req, res) => {
  const { senderId, senderUsername, studentcontent } = req.body;

  // Find all admin users in the log table
  const selectAdminQuery = "SELECT user_Id FROM log WHERE role = 'admin'";
  db1.query(selectAdminQuery, (error, adminResults) => {
    if (error) {
      console.error("Error fetching admin users:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    // Check if there are any admin users
    if (adminResults.length === 0) {
      return res.status(500).json({ error: "Admin users not found" });
    }

    // Insert a message for each admin user
    const insertQuery =
      "INSERT INTO messages (sender_id, sender_username, studentcontent, admin_id, admin_content) VALUES (?, ?, ?, ?, ?);";
    const adminUserIds = adminResults.map((admin) => admin.user_Id);

    // Use a loop to insert messages for each admin
    adminUserIds.forEach((adminUserId) => {
      db1.query(
        insertQuery,
        [senderId, senderUsername, studentcontent, adminUserId],
        (error) => {
          if (error) {
            console.error("Error saving message to database:", error);
            return res.status(500).json({ error: "Failed to save message" });
          }
        }
      );
    });

    res.status(200).json({ message: "Message sent successfully" });
  });
});




router.get("/get_messages/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const selectQuery =
      "SELECT m.*, l.username, l.email, l.role FROM messages m JOIN log l ON m.sender_id = l.user_Id WHERE m.sender_id = ?";
    db1.query(selectQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching messages from database:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
      } else {
        res.status(200).json({ messages: results });
      }
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// router.get("/get_user_messages", (req, res) => {
//   const query = "SELECT * FROM messages";

//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       return res.status(500).send("Error retrieving data from the database.");
//     }

//     if (!results || results.length === 0) {
//       console.log("No data found.");
//       return res.status(404).send("No data found.");
//     }

//     res.json(results);
//   });
// });
// ${userId}

router.get("/get_users/:userId", (req, res) => {
  const userId = req.params.userId;

  const query =
    "SELECT * FROM messages AS m JOIN log AS l ON m.admin_id=l.user_Id WHERE  l.user_Id=?  ";

  db1.query(query,[userId] ,(error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      return res.status(500).send("Error retrieving data from database.");
    }

    if (!results || results.length === 0) {
      console.log("No data found.");
      return res.status(404).send("No data found.");
    }

    const users = results
      .map((result) => {
        // if (!result.profile_image) {
        //   console.log("Image data is missing for a row.");
        //   return null; // Skip this entry or handle it accordingly
        // }

        // const base64 = result.profile_image.toString("base64");
        // Add all the fields along with the profile_image in the response
        return {
          user_Id: result.sender_id,
          username: result.sender_username,
          // email: result.email,
          // role: result.role,
          // Add other fields as needed
          // profile_image: `data:image/png;base64,${base64}`,
        };
      })
      .filter((item) => item !== null); // Remove null entries

    // console.log("Retrieved data from log table:");
    // console.log(dataWithImages);

    res.json(users); // Sending the processed data with images as a response
  });
});

// Helper function to get user messages for the specified user ID
router.get("/get_user_messages/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("User ID:", userId);

  try {
    // Perform the database query to get user messages for the specified user ID
    const selectUserMessagesQuery = `
      SELECT log.user_Id, log.username, messages.studentcontent
      FROM log
      JOIN messages ON log.user_Id = messages.sender_id
      WHERE log.user_Id = ?`;

    // Log the SQL query with parameter values
    const sqlWithValues = selectUserMessagesQuery.replace("?", `'${userId}'`);
    console.log("SQL Query:", sqlWithValues);

    db1.query(selectUserMessagesQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error fetching user messages:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Check if results is an array
      if (!Array.isArray(results)) {
        console.error("Invalid results format:", results);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Check if results is empty
      if (results.length === 0) {
        console.log("No messages found for user ID:", userId);
        return res.status(404).json({ error: "No messages found" });
      }

      // Send the actual user messages as part of the response
      res.status(200).json({ userMessages: results });
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});







module.exports = router;

const db = require("../databases/db2");
const express = require("express");
const router = express.Router();


router.get("/DisplayCoursesForBuy", async (req, res) => {
  try {
    const [courses] = await db.query("SELECT c.courseCreationId,c.courseName,c.courseYear,c.courseStartDate,c.courseEndDate,c.cost,c.Discount,c.totalPrice,ci.cardimeageuploadID,ci.cardimeage FROM course_creation_table AS c JOIN cardimeageuploadtable AS ci ON ci.courseCreationId = c.courseCreationId;");
    
    const base64CardImage = courses[0].cardimeage.toString("base64");
  
    // Return the response
    res.status(200).json({
      courses: courses.map(course => ({
        courseCreationId: course.courseCreationId,
        courseName: course.courseName,
        courseYear: course.courseYear,
        courseStartDate: course.courseStartDate,
        courseEndDate: course.courseEndDate,
        cost: course.cost,
        Discount: course.Discount,
        totalPrice: course.totalPrice,
        cardimeageuploadID: course.cardimeageuploadID,
        cardimeage: `data:image/png;base64,${base64CardImage}`,
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



  router.post('/addToCart', async (req, res) => {
    const { user_id, courseCreationId } = req.body;
    console.log('Received request body:', req.body);
  
    if (!user_id || !courseCreationId) {
      return res.status(400).json({ error: 'User ID and CourseCreationId are required' });
    }
  
    try {
      // Check if the course already exists in the cart
      const checkExistingCourseQuery = 'SELECT * FROM useraddtocart WHERE user_id = ? AND courseCreationId = ?';
      const [existingCourse] = await db.query(checkExistingCourseQuery, [user_id, courseCreationId]);
  
      if (existingCourse.length > 0) {
        // Course already exists in the cart
        return res.status(400).json({ error: 'Course already in the cart' });
      }
  
      // If the course doesn't exist, add it to the cart
      const addToCartQuery = 'INSERT INTO useraddtocart (user_id, courseCreationId) VALUES (?, ?)';
      await db.query(addToCartQuery, [user_id, courseCreationId]);
  
      console.log('Added to cart successfully');
      res.status(200).json({ message: 'Added to cart successfully' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.post('/buyCourses', (req, res) => {
    const { user_id, courseCreationId } = req.body;
  console.log('Received request body:', req.body);

    if (!user_id || !courseCreationId) {
      return res.status(400).json({ error: 'User ID and CourseCreationId are required' });
    }
  
    const buyCoursesQuery = 'INSERT INTO userbuycourses (user_id, courseCreationId) VALUES (?, ?)';
    db.query(buyCoursesQuery, [user_id, courseCreationId], (err) => {
      if (err) {
        console.error('Error adding to cart:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Buy successfully');
        res.status(200).json({ message: 'Buy successfully' });
      }
    });
  });



  router.get('/addedCourses/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Perform the database query to get the added courses for the user
      const getAddedCoursesQuery = `
        SELECT u.user_Id, u.courseCreationId, c.courseCreationId, c.courseName, 
               c.courseYear, c.courseStartDate, c.courseEndDate, c.cost, c.Discount, 
               c.totalPrice, ci.cardimeageuploadID, ci.cardimeage 
        FROM useraddtocart AS u 
        JOIN course_creation_table AS c ON u.courseCreationId = c.courseCreationId 
        JOIN cardimeageuploadtable AS ci ON ci.courseCreationId = c.courseCreationId 
        WHERE u.user_Id = ?`;
  
      const [courses] = await db.query(getAddedCoursesQuery, [userId]);
  
      // Assuming you have a profile image in the result, convert it to base64
      const base64CardImage = courses[0].cardimeage.toString("base64");
  
      // Return the response
      res.status(200).json({
        courses: courses.map(course => ({
          user_Id: course.user_Id,
          courseCreationId: course.courseCreationId,
          courseName: course.courseName,
          courseYear: course.courseYear,
          courseStartDate: course.courseStartDate,
          courseEndDate: course.courseEndDate,
          cost: course.cost,
          Discount: course.Discount,
          totalPrice: course.totalPrice,
          cardimeageuploadID: course.cardimeageuploadID,
          cardimeage: `data:image/png;base64,${base64CardImage}`,
        }))
      });
    } catch (error) {
      console.error('Error fetching added courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.post('/deleteFromCart', (req, res) => {
    const { user_id, course_id } = req.body;
  
    if (!user_id || !course_id) {
      return res.status(400).json({ error: 'User ID and Course ID are required' });
    }
  
    const deleteFromCartQuery = 'DELETE FROM useraddtocart WHERE user_Id = ? AND courseCreationId = ?';
    db.query(deleteFromCartQuery, [user_id, course_id], (err, result) => {
      if (err) {
        console.error('Error deleting from cart:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (result.affectedRows > 0) {
          console.log(`Course ID ${course_id} deleted from cart successfully`);
          res.status(200).json({ message: 'Deleted from cart successfully' });
        } else {
          console.log(`Course ID ${course_id} not found in the cart`);
          res.status(404).json({ error: 'Course not found in the cart' });
        }
      }
    });
  });





module.exports = router;
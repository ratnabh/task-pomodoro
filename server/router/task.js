const express=require('express')
const taskController=require('../controllers/taskController')
const router=express.Router()
router.post('/add_task',taskController.addTask)
router.get('/get_task',taskController.getTask)
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
module.exports=router
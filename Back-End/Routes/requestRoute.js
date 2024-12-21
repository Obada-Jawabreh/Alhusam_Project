const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const requestController = require("../controllers/requestController");
const auth = require("../middleware/authMiddleware");

// Driver application routes
router.post(  "/driver",auth,
  upload.single("resume"),
  requestController.createDriverRequest
);

// Admin routes (protected)
router.get(
  "/all",
  auth,
  requestController.getAllRequests
);

router.patch(
  "/:id/status",
  auth,
  requestController.updateRequestStatus
);

module.exports = router;
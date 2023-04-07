const express = require("express");
const { isAdmin, isAuth } = require("../config/auth");
const router = express.Router();

const {
  addTicket,
  deleteTicket,
  getTicket,
  updateTicketStatus,
  withdrawTicketStatus,
  getTicketByUser,
  rejectTicket,
} = require("../controller/ticketController");

// add ticket
// router.post("/add", isAuth, addTicket);
router.post("/add/:id", addTicket);

// delete ticket
router.delete("/remove/:id", deleteTicket);

// get ticket
router.get("/", getTicket);

// get ticket based on userId
router.get("/:id", getTicketByUser);

//update ticket status
router.put("/status/:id", isAdmin, updateTicketStatus);

//withdraw ticket status
router.put("/status/withdraw/:id", isAdmin, withdrawTicketStatus);

// reject ticket
router.put("/status/rejected/:id", rejectTicket);

module.exports = router;

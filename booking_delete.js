document.getElementById("deleteEventBtn").addEventListener("click", async () => {
  const eventId = document.getElementById("modalEventId").value;

  if (!eventId) {
    alert("Event ID is missing.");
    return;
  }

  if (!confirm("Are you sure you want to delete this event?")) {
    return;
  }

  try {
    await firebase.firestore().collection("roomevents").doc(eventId).delete();

    alert("Event deleted successfully.");

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("eventDetailModal"));
    modal.hide();

    // Remove from calendar
    const event = calendar.getEventById(eventId);
    if (event) event.remove();
  } catch (error) {
    console.error("Error deleting event: ", error);
    alert("Failed to delete event.");
  }
});

document.getElementById("saveEventBtn").addEventListener("click", async () => {
  if (!confirm("Are you sure you want to save changes to this event?")) return;

  const eventId = document.getElementById("modalEventId").value;
  const title = document.getElementById("modalEventTitle").value;
  const start = new Date(document.getElementById("modalEventStart").value);
  const end = new Date(document.getElementById("modalEventEnd").value);
  const roomName = document.getElementById("modalEventRoom").value;
  const companyCode = document.getElementById("modalEventCompany").value;
  const eventDescription = document.getElementById("modalEventDesc").value;

  if (!title || !start || !end || !roomName || !companyCode) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    await firebase.firestore().collection("roomevents").doc(eventId).update({
      title,
      start: firebase.firestore.Timestamp.fromDate(start),
      end: firebase.firestore.Timestamp.fromDate(end),
      roomName,
      companyCode,
      eventDescription
    });

    alert("Event updated successfully.");

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("eventDetailModal"));
    modal.hide();

    // Refresh calendar events
    if (window.calendar && typeof selectRoom === 'function') {
      selectRoom(currentRoom);  // Reload current room's events
    }

  } catch (error) {
    console.error("Error updating document: ", error);
    alert("Failed to update event.");
  }
});


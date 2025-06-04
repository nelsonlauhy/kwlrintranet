document.getElementById('saveEventBtn').addEventListener('click', async function () {
  const confirmed = confirm("Are you sure you want to save the changes?");
  if (!confirmed) return;

  const docId = document.getElementById('modalEventId').value;
  const title = document.getElementById('modalEventTitle').value.trim();
  const start = new Date(document.getElementById('modalEventStart').value);
  const end = new Date(document.getElementById('modalEventEnd').value);
  const roomName = document.getElementById('modalEventRoom').value;
  const companyCode = document.getElementById('modalEventCompany').value;
  const description = document.getElementById('modalEventDesc').value.trim();

  if (!title || !start || !end || !roomName) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    await firebase.firestore().collection('roomevents').doc(docId).update({
      title: title,
      start: firebase.firestore.Timestamp.fromDate(start),
      end: firebase.firestore.Timestamp.fromDate(end),
      roomName: roomName,
      companyCode: companyCode,
      eventDescription: description
    });

    alert("Update completed.");
    bootstrap.Modal.getInstance(document.getElementById('eventDetailModal')).hide();

    // Optional: Refresh the calendar
    if (typeof selectRoom === 'function') {
      selectRoom(currentRoom);
    }
  } catch (error) {
    console.error("Error updating document:", error);
    alert("Error updating record.");
  }
});

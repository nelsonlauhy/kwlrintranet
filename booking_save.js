document.getElementById('saveEventBtn').addEventListener('click', async function () {
  const confirmed = confirm("Are you sure you want to save the changes?");
  if (!confirmed) return;

  const docId = document.getElementById('modalEventId').value;
  const title = document.getElementById('modalEventTitle').value.trim();
  const startStr = document.getElementById('modalEventStart').value;
  const endStr = document.getElementById('modalEventEnd').value;
  const roomName = document.getElementById('modalEventRoom').value;
  const companyCode = document.getElementById('modalEventCompany').value;
  const description = document.getElementById('modalEventDesc').value.trim();

  const start = new Date(startStr);
  const end = new Date(endStr);

  // Basic validation
  if (!docId) {
    alert("Missing event ID.");
    return;
  }
  if (!title || !startStr || !endStr || !roomName) {
    alert("Please fill in all required fields.");
    return;
  }
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    alert("Invalid date/time.");
    return;
  }
  if (start >= end) {
    alert("End time must be after start time.");
    return;
  }

  console.log("Saving event:", {
    docId, title, start, end, roomName, companyCode, description
  });

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
    const modalEl = document.getElementById('eventDetailModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();

    // Refresh calendar
    if (typeof selectRoom === 'function' && window.currentRoom) {
      await selectRoom(currentRoom);
    }

  } catch (error) {
    console.error("Error updating document:", error);
    alert("Error saving changes. Check console for details.");
  }
});

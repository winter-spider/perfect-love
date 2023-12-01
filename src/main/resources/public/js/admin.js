let lastGuestId;
let all = 0,
  pastors = 0,
  doctors = 0,
  barristers = 0,
  mr = 0,
  miss = 0,
  mrs = 0,
  bro = 0,
  sis = 0;

let filterOpened;

getWeddingGuests(1, false);
getAllWeddingGuest();

document.body.addEventListener("click", function (e) {
  let target = e.target.id;
  if (target == "load-more") {
    document.getElementById("load-more").style.display = "none";
    document.getElementById("load-more-spinner").style.display = "block";
    getWeddingGuests(lastGuestId, true);
  } else if (target == "guest" || target == "number" || target == "filter") {
    if (!filterOpened) {
      document.getElementById("filter-options").style.display = "block";
      filterOpened = true;
    } else {
      document.getElementById("filter-options").style.display = "none";
      filterOpened = false;
    }
  } else if (e.target.classList.contains("img")) {
    getWeddingGuest(
      e.target.parentElement.previousElementSibling.previousElementSibling.value
    );
  } else if (target == "close-modal") {
    document.getElementById("guest-modal").style.display = "none";
  }
});

function getWeddingGuest(id) {
  let weddingGuestXhr = new XMLHttpRequest();
  weddingGuestXhr.open("GET", `/invitation/${id}`, true);
  weddingGuestXhr.send();

  weddingGuestXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      document.getElementById("guest-modal-container").innerHTML =
        bindGuestModal(response);
      document.getElementById("guest-modal").style.display = "block";
    }
  };
}

function getWeddingGuests(id, continuation) {
  let weddingGuestsXhr = new XMLHttpRequest();
  weddingGuestsXhr.open("GET", `/invitations/${id}`, true);
  weddingGuestsXhr.send();

  weddingGuestsXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      lastGuestId = response[response.length - 1].id + 1;
      if (!continuation) {
        document.getElementById("spinner").style.display = "none";
        document.getElementById("table-container").style.display = "block";
        document.getElementById("table").innerHTML = "";
      }
      document.getElementById("load-more-spinner").style.display = "none";
      document.getElementById("load-more").style.display = "block";
      response.forEach(function (item, index) {
        document.getElementById("table").innerHTML += bindWeddingGuest(
          item,
          index + (lastGuestId - 10)
        );
      });
    }
  };
}

function getAllWeddingGuest() {
  let allWeddingGuestXhr = new XMLHttpRequest();
  allWeddingGuestXhr.open("GET", "/invitations", true);
  allWeddingGuestXhr.send();

  allWeddingGuestXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      response.forEach(function (item) {
        all++;
        if (item.title == "Pastor") {
          pastors++;
        } else if (item.title == "Doctor") {
          doctors++;
        } else if (item.title == "Barrister") {
          barristers++;
        } else if (item.title == "Mr") {
          mr++;
        } else if (item.title == "Miss") {
          miss++;
        } else if (item.title == "Mrs") {
          mrs++;
        } else if (item.title == "Bro") {
          bro++;
          console.log(bro)
        } else if (item.title == "Sis") {
          sis++;
        }
      });

      let guestTitleArray = [];

      guestTitleArray.push(
        all,
        pastors,
        doctors,
        barristers,
        mr,
        miss,
        mrs,
        bro,
        sis
      );

      document.getElementById("number").textContent = all;
      let guestTitles = document.querySelectorAll(".guest-title");
      guestTitles.forEach(function (item, index) {
        item.innerText = guestTitleArray[index];
      });
    }
  };
}

function generateWeddingGuests() {
  let weddingGuestsXhr = new XMLHttpRequest();
  weddingGuestsXhr.open("GET", "/invitation/generate", true);
  weddingGuestsXhr.send();

  weddingGuestsXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      response.forEach(function (item, index) {
        document.getElementById("table").innerHTML += bindWeddingGuest(
          item,
          index + 1
        );
      });
    }
  };
}

function bindWeddingGuest(guest, index) {
  return `<tr class="gold-text">
    <input type="hidden" value=${guest.id}>
    <td>${index}</td>
    <td style="display: flex; justify-content: center; align-items: center;"><img class="img" src="${guest.photo}"
            alt="" style="width: 50px; height: 50px; border-radius: 70px; object-fit: cover;"></td>
    <td>
        <p>${guest.title} ${guest.firstName} ${guest.lastName}</p>
        <p>${guest.mobileNumber}</p>
    </td>
    <td>
        <p>${guest.appearance}</p>
    </td>
</tr>`;
}

function bindGuestModal(guest) {
  return `<img
    src="${guest.photo}"
    alt=""
    style="width: 100%; border-radius: 4px"
  />
  <div class="px-2 pt-2 pb-20">
    <div class="w3-row">
      <div class="w3-col s12">
        <p class="my-1">Title: ${guest.title}</p>
        <p class="my-1">Name: ${guest.firstName} ${guest.lastName}</p>
        <p class="my-1">Mobile: ${guest.mobileNumber}</p>
        <p class="my-1">Email: ${guest.email}</p>
        <p class="my-1">Appearance: ${guest.appearance}</p>
        <p class="my-1">State: ${guest.state}</p>
        <p class="my-1">Arrival Date: ${guest.date}</p>
        <p class="my-1">Need Assistance: ${guest.assistance}</p>
        <p class="my-1">
          ${guest.memories}
        </p>
      </div>
    </div>

    <button
      id="close-modal"
      class="p-1 rounded w-20 mt-4 font-bold gold-text ring-1 ring-[#fbc050]"
    >
      Close
    </button>
  </div>`;
}

import axios from "axios";

const searchIp = document.getElementById("searchIp");
const ipAddressData = document.getElementById("ip-address-data");
const location = document.getElementById("location-data");
const timezone = document.getElementById("timezone-data");
const isp = document.getElementById("isp-data");
const input = document.getElementById("ipInput");

let lat = 34.7887;
let lng = -92.40766;
const map = L.map("map").setView([lat, lng], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let marker = L.marker([lat, lng]).addTo(map);

const fetchData = async (term) => {
	try {
		const response = await axios.get(
			`https://geo.ipify.org/api/v2/country,city?apiKey=at_GvJkFQiCUEBocM7CTQPZ3RPjJth1E&ipAddress=${term}`
		);
		const res = response.data;
		console.log(res);

		location.innerText = `${res.location.city}, ${res.location.country} ${res.location.postalCode}`;
		timezone.innerText = res.location.timezone;
		isp.innerText = res.isp;
		ipAddressData.innerText = res.ip;

		lat = res.location.lat;
		lng = res.location.lng;

		map.setView([lat, lng], 13);

		marker.setLatLng([lat, lng]);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};
searchIp.addEventListener("click", (e) => {
	e.preventDefault();
	fetchData(input.value);
});

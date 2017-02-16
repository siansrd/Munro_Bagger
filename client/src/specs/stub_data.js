"use strict"

const testMunros = [
	{
		id: 1,
		smcId: "M240",
		name: "A' Bhuidheanach Bheag",
		height: 936,
		gridRef: {letters: "NN", eastings: "66069", northings: "77600"},
		latLng: {lat: 56.870399, lng: -4.198839},
		region: "Loch Ericht to Drumochter",
		meaning: "The little yellow place",
		weatherId: "350001",
		forecast: {
			data: {
				dataDate: "2017-02-05T17:00:00Z",
				days: [
					{D: "ESE", Gn: "27", Hn: "100", PPd: "87", S: "13", V: "VP", Dm: "-1", FDm: "-7", W: "24", U: "1", $: "Day"},
					{D: "SE", Gn: "51", Hn: "97", PPd: "61", S: "40", V: "VP", Dm: "-3", FDm: "-13", W: "6", U: "1", $: "Day"},
					{D: "SSE", Gn: "11", Hn: "97", PPd: "58", S: "9", V: "MO", Dm: "-2", FDm: "-6", W: "24", U: "1", $: "Day"}
				]
			},
			updated_at: "2017-02-05T18:15:52.713Z"
		}
	},
	{
		id: 2,
		smcId: "M144",
		name: "A' Chailleach (Fannaichs)",
		height: 997,
		gridRef: {letters: "NH", eastings: "13620", northings: "71414"},
		latLng: {lat: 57.693782, lng: -5.12873},
		region: "Loch Maree to Loch Broom",
		meaning: "The old woman",
		weatherId: "350024",
		forecast: {
			data: {
				dataDate: "2017-02-05T17:00:00Z",
				days: [
					{D: "SSW", Gn: "16", Hn: "100", PPd: "42", S: "7", V: "MO", Dm: "-1", FDm: "-6", W: "23", U: "1", $: "Day"},
					{D: "SE", Gn: "58", Hn: "90", PPd: "65", S: "47", V: "VG", Dm: "-1", FDm: "-12", W: "24", U: "1", $: "Day"},
					{D: "S", Gn: "18", Hn: "94", PPd: "34", S: "16", V: "GO", Dm: "-1", FDm: "-6", W: "24", U: "1", $: "Day"}
				]
			},
			updated_at: "2017-02-05T18:17:25.631Z"
		}
	},
	{
		id: 3,
		smcId: "M251",
		name: "A' Chailleach (Monadh Liath)",
		height: 930,
		gridRef: {letters: "NH", eastings: "68110", northings: "04178"},
		latLng: {lat: 57.109564, lng: -4.179285},
		region: "Speyside to Great Glen",
		meaning: "The old woman",
		weatherId: "350025",
		forecast: {
			data: {
				dataDate: "2017-02-05T17:00:00Z",
				days: [
					{D: "ESE", Gn: "18", Hn: "97", PPd: "43", S: "9", V: "VP", Dm: "-2", FDm: "-7", W: "24", U: "1", $: "Day"},
					{D: "SSE", Gn: "49", Hn: "96", PPd: "57", S: "38", V: "VP", Dm: "-3", FDm: "-13", W: "6", U: "1", $: "Day"},
					{D: "S", Gn: "13", Hn: "97", PPd: "58", S: "9", V: "GO", Dm: "-1", FDm: "-6", W: "24", U: "1", $: "Day"}
				]
			},
			updated_at: "2017-02-05T18:15:47.744Z"
		}
	},
	{
		id: 4,
		smcId: "M033",
		name: "A' Chralaig",
		height: 1120,
		gridRef: {letters: "NH", eastings: "09431", northings: "14797"},
		latLng: {lat: 57.18424, lng: -5.154842},
		region: "Glen Shiel to Loch Mullardoch",
		meaning: "The basket or creel",
		weatherId: "350029",
		forecast: {
			data: {
				dataDate: "2017-02-05T17:00:00Z",
				days: [
					{D: "E", Gn: "20", Hn: "100", PPd: "87", S: "11", V: "MO", Dm: "-3", FDm: "-6", W: "24", U: "1", $: "Day"},
					{D: "SE", Gn: "51", Hn: "94", PPd: "67", S: "40", V: "GO", Dm: "-4", FDm: "-14", W: "24", U: "1", $: "Day"},
					{D: "SSE", Gn: "16", Hn: "98", PPd: "58", S: "11", V: "MO", Dm: "-2", FDm: "-8", W: "24", U: "1", $: "Day"}
				]
			},
			updated_at: "2017-02-05T18:19:27.710Z"
		}
	},
	{
		id: 5,
		smcId: "M274",
		name: "A' Ghlas-bheinn",
		height: 918,
		gridRef: {letters: "NH", eastings: "00822", northings: "23105"},
		latLng: {lat: 57.25509, lng: -5.303687},
		region: "Glen Shiel to Loch Mullardoch",
		meaning: "The greenish-grey hill",
		weatherId: "350044",
		forecast: {
			data: {
				dataDate: "2017-02-05T17:00:00Z",
				days: [
					{D: "ENE", Gn: "11", Hn: "100", PPd: "68", S: "2", V: "VP", Dm: "-2", FDm: "-4", W: "24", U: "1", $: "Day"},
					{D: "SE", Gn: "58", Hn: "87", PPd: "64", S: "47", V: "VG", Dm: "-2", FDm: "-13", W: "24", U: "1", $: "Day"},
					{D: "SSE", Gn: "16", Hn: "95", PPd: "49", S: "13", V: "VG", Dm: "-1", FDm: "-6", W: "24", U: "1", $: "Day"}
				]
			},
			updated_at: "2017-02-05T18:16:11.699Z"
		}
	}
];

let jsonMunros = JSON.stringify(testMunros);

const fromJsonMunros = function() {
	return JSON.parse(jsonMunros);
}

const toJsonMunros = function() {
	return JSON.stringify(testMunros);
}

module.exports = { munros: fromJsonMunros, jsonMunros: toJsonMunros };
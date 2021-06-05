import axios from "axios";
import qs from "querystring";
import {
  decemberMonthlyListeners,
  novemberFollowers,
  novemberMonthlyListeners,
  novemberPopularity,
  octoberFollowers,
} from "./spotify_database";
import SpotifyWebApi from "spotify-web-api-js";

const urlList = [
  {id: "2ANytjXP6otAgDNUwWeym5", name: "Aki Rozenthal"},
  {id: "4YEcY6xH077Ox6D0Ev5LfC", name: "Amenosei"},
  {id: "0HX3yJ7THlqC9drRqhOkgo", name: "AZKi"},
  {id: "6jiIsVGy8SEoPnFeFOsGtH", name: "EMMA HAZY MINAMI"},
  {id: "6SI1fprYnlol2XmQdZr05n", name: "Enogu"},
  {id: "2MpCDbGU66x0pDfCRESqmZ", name: "Fujita Aoi"},
  {id: "1YToShGh3Sto5icr0OCIQw", name: "Hanabasami Kyou"},
  {id: "7JbBmfOwEH5JnrcLI5pXlg", name: "Hibiki Ao"},
  {id: "3rKuuE5zsQL95UGZIuuVPP", name: "Higuchi Kaede"},
  {id: "5OBmR4AY53SS26qHZ4uwnq", name: "HIMEHINA"},
  {id: "18Zr9CaElvS40S0AtizMWZ", name: "Hololive Idol Project"},
  {id: "726WiFmWkohzodUxK3XjHX", name: "Hoshimachi Suisei"},
  {id: "5XaBNKQo65yYcjNA8wQPOk", name: "Houshou Marine"},
  {id: "2c32JruIkUyfdycHmhIph4", name: "KAF"},
  {id: "0eoylAWvxfXTc0dX43xZEU", name: "Kaguya Luna"},
  {id: "2mpbSXxEdAA8c464XaLFy8", name: "Kashiko Mari"},
  {id: "2nKGmC5Mc13ct02xAY8ccS", name: "Kizuna Ai"},
  {id: "4uWpa0r7BZUXJ1ip2LJysz", name: "KMNZ"},
  {id: "0l0DcBm3rH8mCp7iBGCCuq", name: "kotone (Tenjin Kotone)"},
  {id: "5L7Z6whksgoaah3sNKjnTZ", name: "Marinasu"},
  {id: "7eiJvcRCrFUurBNHNFI7fD", name: "Marpril"},
  {id: "6GHr4rGFHGRUuzuCuxJA0f", name: "Minato Aqua"},
  {id: "0nQt0sivKt7x5EE1n6nHKt", name: "Mirai Akari"},
  {id: "707mr1aJKwfX8UP4Lc5CFg", name: "Mito Tsukino"},
  {id: "6n4OdD0Q138mkJwVdk5noN", name: "MonsterZ MATE"},
  {id: "1PhE6rv0146ZTQosoPDjk8", name: "Mori Calliope"},
  {id: "37pTvx1NINPgHJ3ZCZND05", name: "NIJISANJI"},
  {id: "4CXoKFNF4AhnEBHLdSebJg", name: "NIJISANJI ID"},
  {id: "3eXlNWeumBSa8pG9VSHdwl", name: "Pinky Pop Hepburn"},
  {id: "63mQUyT3UKIYrnbUP0ybNf", name: "Raindrops"},
  {id: "0nEKA86Og8b1gll9dc0tS9", name: "Rikka"},
  {id: "1rFELoNfdLOYWPwtrBN6zS", name: "RIM"},
  {id: "6YFKPqnL4YtX9jJmj5zkzv", name: "Sakura Miko"},
  {id: "2GR0oaCTOgws9PfuheMw0k", name: "Shirakami Fubuki"},
  {id: "3n3gkyllpW8tsdg87u6jNe", name: "SIRO"},
  {id: "6OduXXk2Xvxkfe9QG5upcc", name: "somunia"},
  {id: "1jtLt3mbmVe3Rghh1DvgBs", name: "Sougetsu Eli"},
  {id: "47dWUegQfMWoEuh9lLfIhi", name: "Suntory Nomu"},
  {id: "3k7moMXUTPj4s7vJ0Z45In", name: "Suou Patra"},
  {id: "2g9gjJayRURjomDGRLNaZR", name: "Tokino Sora"},
  {id: "6BzlN4V17m7ogeItP4CNN5", name: "YuNi"},
  {id: "68609MOnEU86kVyMf26JnM", name: 'Tsunomaki Watame'},
  {id: "6UCFRdg4ySMWj6O4QRKyZs", name: "Takanashi Kiara"},
  {id: "0FMBfzP2kK1RajdetEVL5c", name: "VESPERBELL"}
];

export default class SpotifyApi {
  constructor() {
    this.token =
      "BQDG7hFt7XECpxSkRw2ScfqGu5jViEVLrdJ4uFIg7WUDsgS980cYpSap6mGw5Ho6YEGoXb6Re68bmp19hKF4xpX8BE7w8Ooy25mo2U13aT7R3OIackfOM7uf7oVBWV-gohafTadrRaWOWPFT0uUeWhO0L_sD4rt978nc89w0wyqn-ebEUJDbY_IMTbKOPWJp6JiLnI1Rx0zzsEFswYRz6AqzCJVMvF0_3WsZp0jM8Ilc9no-rFjX69d0ESjftMKvtuVCb382FXda3Dk";
  }

  async authorizeApp() {
    const requestBody = {
      grant_type: "client_credentials",
    };

    const config = {
      Authorization: `Basic NDBhODllMTI1MzlmNDI0MTg3ZTA5ZTk2MTIzY2QxYjAgOiAwYTUzYTNmYTdiZmU0M2I0YmNlMmZkMzdhMzBhNDNiMw==`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    return await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(requestBody),
      config,
    );
  }

  async initializeApp() {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
      function (data) {
        console.log('Artist albums', data.body);
      },
      function (err) {
        console.error(err);
      }
    );
  }

  async getArtistData(id) {
    try {
      const res = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/artists/${id}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const data = res.data;

      return {
        externalUrl: data.external_urls.spotify,
        followers: data.followers.total,
        id: data.id,
        images: data.images[0]?.url ? data.images[0].url : "",
        artistName: data.name,
        popularity: data.popularity,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getArtistList() {
    let list = [];

    for (let index = 0; index < urlList.length; index++) {
      const id = urlList[index].id;
      const res = await this.getArtistData(id);
      if (res.externalUrl) {
        list.push(res);
      }
    }

    return list;
  }

  async getFollowerList() {
    try {
      let list = [];
      const lastMonth = novemberFollowers;

      for (let i = 0; i < urlList.length; i++) {
        const id = urlList[i].id;
        const res = await this.getArtistData(id);
        if (res.externalUrl) {
          const findLastMonth = lastMonth.filter(
            (item) => item.name.toLowerCase() == urlList[i].name.toLowerCase(),
          );

          const lastMonthData = findLastMonth.length ? findLastMonth[0] : null;

          const obj = {
            name: urlList[i].name,
            followers: res.followers,
            images: res.images,
            url: res.externalUrl,
            last_month_rank: lastMonthData ? lastMonthData.last_month_rank : null,
          };

          list.push(obj);
        }
      }

      list.sort((a, b) => b.followers - a.followers);

      return list;
    } catch (error) {
      console.log(error);
    }
  }

  async getMonthlyListeners() {
    try {
      let list = [];
      const lastMonth = novemberMonthlyListeners;

      for (let i = 0; i < urlList.length; i++) {
        const id = urlList[i].id;
        const res = await this.getArtistData(id);
        if (res.externalUrl) {
          const findLastMonth = lastMonth.filter(
            (item) => item.name.toLowerCase() == urlList[i].name.toLowerCase(),
          );

          const findThisMonth = decemberMonthlyListeners.filter(
            (item) => item.name.toLowerCase() == urlList[i].name.toLowerCase(),
          );

          const thisMonthData = findThisMonth.length ? findThisMonth[0] : null;
          const lastMonthData = findLastMonth.length ? findLastMonth[0] : null;

          const obj = {
            name: urlList[i].name,
            monthly_listeners: thisMonthData ? thisMonthData.monthly_listeners : null,
            images: res.images,
            url: res.externalUrl,
            last_month_rank: lastMonthData ? lastMonthData.rank : null,
          };

          list.push(obj);
        }
      }

      list.sort((a, b) => b.monthly_listeners - a.monthly_listeners);

      return list;
    } catch (error) {
      console.log(error);
    }
  }

  async getPopularityList() {
    try {
      let list = [];
      const lastMonth = novemberPopularity;

      for (let index = 0; index < urlList.length; index++) {
        const id = urlList[index].id;
        try {
          const res = await this.getArtistData(id);
          if (res.externalUrl) {
            const findLastMonth = lastMonth.filter(
              (item) => item.id == urlList[index].id,
            );

            const lastMonthData = findLastMonth.length ? findLastMonth[0] : null;

            const obj = {
              name: urlList[index].name,
              popularity: res.popularity,
              images: res.images,
              url: res.externalUrl,
              last_month_rank: lastMonthData ? lastMonthData.rank : null,
            };

            list.push(obj);
          }
        } catch (error) {
          console.log(error);
        }
      }

      list.sort((a, b) => b.popularity - a.popularity);

      return list;
    } catch (error) {
      console.log(error);
    }
  }

  async getChartData() {
    try {
      let list = [];
      const lastMonth = octoberFollowers;

      for (let i = 0; i < urlList.length; i++) {
        const id = urlList[index].id;
        const res = await this.getArtistData(id);
        if (res.externalUrl) {
          const findLastMonth = lastMonth.filter(
            (item) => item.name.toLowerCase() == urlList[i].name.toLowerCase(),
          );

          const lastMonthData = findLastMonth.length ? findLastMonth[0] : null;

          const obj = {
            name: urlList[i].name,
            followers: res.followers,
            popularity: res.popularity,
            images: res.images,
            url: res.externalUrl,
            last_month_rank: lastMonthData ? lastMonthData.rank : null,
          };

          list.push(obj);
        }
      }

      list.sort((a, b) => b.followers - a.followers);

      return list;
    } catch (error) {
      console.log(error);
    }
  }
}

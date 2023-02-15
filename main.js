window["cbdata"] = (data) => {
  //alert(99);
  console.log("-data load callback");
  if (window["$callback"]) window["$callback"](data);
};
const URL_BLOGGER_BROWSER = ({ blogId, categorie, callback }) =>
  `https://www.blogger.com/feeds/${blogId}/posts/default${
    categorie ? "/-/" + categorie : ""
  }/?${callback ? "callback=" + callback : ""}&alt=json`;

export default class QueryGBlogger {
  constructor({ blogId, isBrowser }) {
    this.blogId = blogId;
    this.isBrowser = isBrowser;
    console.log("start qgb");
  }
  load({ callback }) {
    window["$callback"] = callback;
    // if (this.isBrowser) {
    const url = URL_BLOGGER_BROWSER({
      blogId: this.blogId,
      callback: this.isBrowser ? "cbdata" : undefined,
    });

    let script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onerror = () => {
      console.error("Error occurred while loading feed blogger");
    };
    script.onload = () => {
      console.log("load script feed :)");
    };
    document.body.append(script);
  }

  //  }
}
import GhostAdminAPI from "@tryghost/admin-api";

const postToGhost = (featuredImage, title, html, status, tags) => {
  const api = new GhostAdminAPI({
    url: process.env.URL,
    key: process.env.VERIXR_API_KEY,
    version: "v5.0",
  });

  api.posts.add(
    {
      feature_image: featuredImage,
      title: title,
      html,
      custom_template: "custom-post-not-image",
      status: status,
      tags: tags,
    },
    { source: "html" }
  );
};

export default postToGhost;

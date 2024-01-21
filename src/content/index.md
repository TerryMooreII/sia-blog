---
template: page
created_at: 2024-01-12 9:00:00-5:00
description: The site index page
---
<style>
  .social-container {
    margin-top: calc(20vh);
    margin-bottom: calc(20vh);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .social {
    display: flex;
    justify-content: space-around;
  }

  .social a {
    display: flex;
    justify-content: center;
  }

  .social img {
    background-color: transparent;
    margin: 0 20px;
  }

  @media only screen and (max-width: 700px) {
    .social img {
      width: 50%;
      margin: 0px;
    }
  }
</style>


<div class="social-container">
  <div class="social">
    <a href="https://github.com/TerryMooreII" title="github">
      <img src="./imgs/github.svg" alt="github"/>
    </a>
    <a href="https://www.linkedin.com/in/terrymooreii" title="linkedin">
      <img src="./imgs/linkedin.svg" alt="linkedin"/>
    </a>
    <a href="https://mastodon.social/@terrymooreii" title="mastodon">
      <img src="./imgs/mastodon.svg" alt="mastodon"/>
    </a>
  </div>
</div>

import React from "react";
import Link from "next/link";

const AppIcon = () => (
  <Link href="/">
    <a className="app-icon" title="App Name">
      <img src="/icon.png" />
      <style jsx>{`
        a:hover {
          filter: none;
        }

        img {
          position: absolute;
          left: 10px;
          top: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      `}</style>
    </a>
  </Link>
);

export default ({ title = "App Name" }) => (
  <header className="color-header-bg color-background-fg">
    <AppIcon />
    {title}
    <style jsx>{`
      header {
        position: fixed;
        z-index: 1000;
        width: 100%;
        left: 0;
        top: 0;
        height: 50px;
        line-height: 50px;
        font-weight: normal;
        text-align: center;
      }

      :global(main) {
        margin-top: 50px;
      }
    `}</style>
  </header>
);

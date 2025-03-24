"use client";
import { makeRequestServer } from "@/lib/fetch";
import { useEffect, useState } from "react";

export default function ScriptInjector({ slug = "global" }) {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    async function fetchScripts() {
      try {
        const response = await makeRequestServer("/header_scripts/", {
          method: "POST",
          data: { slug }
        });

        if (response?.data?.scripts) {
          setScripts(response.data.scripts);
        }
      } catch (error) {
        console.error("❌ Failed to fetch scripts:", error);
      }
    }

    fetchScripts();
  }, [slug]);

  useEffect(() => {
    if (!scripts.length) return;

    console.log(`🚀 Injecting Scripts`, scripts);

    scripts.forEach((script, index) => {
      if (!script.content) return;

      const scriptTag = document.createElement("script");
      scriptTag.type = script.type || "text/javascript";
      scriptTag.id = `global-${index}`;
      scriptTag.text =
        script.type === "application/ld+json"
          ? JSON.stringify(script.content)
          : script.content;

      const head = document.querySelector("head");
      if (head) {
        head.appendChild(scriptTag);
        console.log(`✅ Injected Script in <head>: global-${index}`, scriptTag);
      } else {
        console.warn("⚠️ <head> not found, injecting into <body>");
        document.body.appendChild(scriptTag);
      }
    });

    return () => {
      scripts.forEach((_, index) => {
        const existingScript = document.getElementById(`global-${index}`);
        if (existingScript) {
          existingScript.remove();
          console.log(`🗑️ Removed Script: global-${index}`);
        }
      });
    };
  }, [scripts]);

  return null;
}

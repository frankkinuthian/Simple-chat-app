import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { Send } from "lucide-react";

/**
 * These are just some fake messages we use to show how
 * different themes look in the preview.
 */
const PREVIEW_MESSAGES = [
  {
    id: 1,
    content: "Hey! How are you!",
    isSent: false,
  },
  {
    id: 2,
    content: "I'm good, thanks for asking!",
    isSent: true,
  },
  {
    id: 3,
    content: "What's on your mind?",
    isSent: false,
  },
  {
    id: 4,
    content: "Just checking in on you.",
    isSent: true,
  },
];

/**
 * This is our Settings page
 *
 * Right now it's mainly for picking your favorite theme, but who knows what
 * cool features to add later? The page shows you a live preview of how
 * the chat will look with each theme
 *
 *
 * - Pick from a bunch of awesome themes
 * - See exactly how your messages will look
 * - Live preview with some sample chat messages
 */
const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Theme</h2>
        <p className="text-sm text-base-content/70">
          Choose your theme for the interface
        </p>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${
                  theme === t
                    ? "bg-base-200 ring-2 ring-primary"
                    : "hover:bg-base-200/50"
                }
                `}
              onClick={() => setTheme(t)}
              aria-label={`Select ${t} theme`}
              aria-pressed={theme === t}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
                <span className="text-[10px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* PREVIEW MESSAGES SECTION */}
        <h3 className="text-lg font-semibold">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* MOCK UI For chat */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Header for chat */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J{/* Chat profile letter hacky workaround */}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">John Kamwangi</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>
                {/* CHAT MESSAGES */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] bg-base-100 overflow-y-auto ">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isSent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl p-3 shadow-sm
                        ${
                          message.isSent
                            ? "bg-primary text-primary-content"
                            : "bg-base-200 text-base-content"
                        }
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-[10px] mt-1.5
                          ${
                            message.isSent
                              ? "text-primary-content/70}"
                              : "text-base-content/70"
                          }
                          `}
                        >
                          11:46 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CHAT INPUT FIELD */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input flex-1 input-bordered text-sm h-10"
                      placeholder="Type a message..."
                      value="This is the preview"
                      readOnly
                    ></input>
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

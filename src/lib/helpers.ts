export class helpers {
  // ===== Strings =====
  static capitalize(text: string): string {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static fastName(text: string): string {
    if (!text) return "";
    return text.trim().split(" ")[0];
  }

  static lowerCase(text: string): string {
    return text ? text.toLowerCase() : "";
  }

  static upperCase(text: string): string {
    return text ? text.toUpperCase() : "";
  }

  //   ================= Images =================
  static getImgFullUrl(href: string): string {
    if (!href || typeof href !== "string") return "";
    if (/^https?:\/\//.test(href)) return href;
    const base = process.env.EXPO_PUBLIC_IMG_URL?.replace(/\/+$/, "");
    const path = href.replace(/^\/+/, "");
    return `${base}/${path}`;
  }

  //   ================ Date & Time ================

  // Format Date (YYYY-MM-DD → DD/MM/YYYY)
  static formatDate(dateStr: string): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()}`;
  }

  // Format Time (24hr → 12hr AM/PM)
  static formatTime(dateStr: string): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  // Full Date & Time → "DD/MM/YYYY - 4:30 PM"
  static formatDateTime(dateStr: string): string {
    if (!dateStr) return "";
    return `${this.formatDate(dateStr)} - ${this.formatTime(dateStr)}`;
  }

  // Time ago (e.g., "5 minutes ago")
  static timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: any = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
    for (const key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval > 0) {
        return `${interval} ${key}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  }

  // [================== Time Data Ago ==================]
  static timeDataAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    // Just now
    if (diffSeconds < 60) {
      return "Just now";
    }
    // Less than 1 hour
    if (diffMinutes < 60) {
      return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
    }
    // Less than 1 day
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }
    // Yesterday
    if (diffDays === 1) {
      return "Yesterday";
    }
    // Less than 7 days
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }
    // More than 7 days → show date
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // ======================== youtube video link v id ========================
  static getVideoId = (url?: string | null): string | null => {
    if (!url || typeof url !== "string") return null;
    const regExp =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };
}

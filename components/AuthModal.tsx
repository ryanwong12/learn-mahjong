import { useState } from "react";
import { createClient } from "../utils/supabase/client";

export default function AuthModal({}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const supabase = createClient();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="text-center">
        <h2>Check your email!</h2>
        <p>We sent a magic link to {email}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Magic Link"}
      </button>
    </form>
  );
}

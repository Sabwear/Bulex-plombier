function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]!));
}

/** Cloudflare's documented exemption preserves usable mailto links without its decoder. */
export default function EmailLink({email}: {email: string}) {
  const safeEmail = escapeHtml(email);
  return <span style={{display:'contents'}} dangerouslySetInnerHTML={{__html:
    `<!--email_off--><a href="mailto:${safeEmail}">${safeEmail}</a><!--/email_off-->`
  }}/>;
}

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {/* Rating */}
      <div className="flex items-center gap-2 bg-dark-elevated px-4 py-2 rounded-lg border border-gold/30">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-text-primary font-semibold text-sm">4.9/5</span>
        <span className="text-text-muted text-xs">(2,847 reviews)</span>
      </div>

      {/* Instant Download */}
      <div className="flex items-center gap-2 bg-dark-elevated px-4 py-2 rounded-lg border border-emerald/30">
        <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        <span className="text-text-primary font-semibold text-sm">Instant Download</span>
      </div>

      {/* Money Back Guarantee */}
      <div className="flex items-center gap-2 bg-dark-elevated px-4 py-2 rounded-lg border border-royal-purple/30">
        <svg className="w-5 h-5 text-royal-purple" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
        </svg>
        <span className="text-text-primary font-semibold text-sm">30-Day Guarantee</span>
      </div>

      {/* Secure Checkout */}
      <div className="flex items-center gap-2 bg-dark-elevated px-4 py-2 rounded-lg border border-gold/30">
        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span className="text-text-primary font-semibold text-sm">Secure Checkout</span>
      </div>

      {/* 2,847+ Customers */}
      <div className="flex items-center gap-2 bg-dark-elevated px-4 py-2 rounded-lg border border-emerald/30">
        <svg className="w-5 h-5 text-emerald" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
        <span className="text-text-primary font-semibold text-sm">2,847+ Customers</span>
      </div>
    </div>
  );
}

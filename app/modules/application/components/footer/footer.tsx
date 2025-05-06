export const Footer: React.FC = () => (
  <footer className="w-full border-t border-border text-textTertiary text-sm py-6 px-4 sm:px-8 mt-8">
  <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
    <span>
      🧪 Built with love by <a href="https://shan8851.com" target="_blank" rel="noopener noreferrer" className="text-purple hover:underline">shan8851.eth</a>
    </span>
    <span className="text-xs text-textSecondary">© {new Date().getFullYear()} EtherPoll</span>
  </div>
</footer>

)

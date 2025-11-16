import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, EmailIcon } from 'react-share';
import { trackSocialShare } from '../utils/analytics';

const SocialShare = ({ url, title, description, hashtags = ['JusticeForLogan', 'BailReform'], className = '' }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Justice for Logan Federico';
  const shareDescription = description || 'Join us in fighting for criminal justice reform in memory of Logan Federico. Her story must lead to change.';

  const handleShare = (platform) => {
    trackSocialShare(platform);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-sm font-medium text-gray-700 mr-2">Share:</span>

      <FacebookShareButton
        url={shareUrl}
        quote={shareTitle}
        hashtag={`#${hashtags[0]}`}
        onClick={() => handleShare('Facebook')}
        className="transition-transform hover:scale-110"
      >
        <FacebookIcon size={36} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={shareTitle}
        hashtags={hashtags}
        onClick={() => handleShare('Twitter')}
        className="transition-transform hover:scale-110"
      >
        <TwitterIcon size={36} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={shareTitle}
        summary={shareDescription}
        onClick={() => handleShare('LinkedIn')}
        className="transition-transform hover:scale-110"
      >
        <LinkedinIcon size={36} round />
      </LinkedinShareButton>

      <EmailShareButton
        url={shareUrl}
        subject={shareTitle}
        body={shareDescription}
        onClick={() => handleShare('Email')}
        className="transition-transform hover:scale-110"
      >
        <EmailIcon size={36} round />
      </EmailShareButton>

      <button
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          handleShare('Copy Link');
          alert('Link copied to clipboard!');
        }}
        className="w-9 h-9 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        aria-label="Copy link"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
};

export default SocialShare;

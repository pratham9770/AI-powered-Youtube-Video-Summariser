import styles from '../styles/pages/Dashboard.module.css';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { YoutubeIcon } from 'lucide-react';

const Dashboard = () => {
  const { user } = useOutletContext();
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://n8n-dev.subspace.money/webhook/ytube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get summary');
      }
      
      const data = await response.json();
      setSummary(data.summary || 'No summary available');
    } catch (err) {
      setError('Failed to get video summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Video Summarizer</title>
      </Helmet>

      <div>
        <div className={styles.titleContainer}>
          <YoutubeIcon className={styles.icon} />
          <h2 className={styles.title}>Video Summarizer</h2>
        </div>

        <p className={styles['welcome-text']}>
          Welcome, {user?.metadata?.firstName || 'stranger'}{' '}
          <span role="img" alt="hello">
            👋
          </span>
        </p>

        <p className={styles['info-text']}>
          Enter a YouTube URL below to get an AI-powered summary
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL here..."
            className={styles.input}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Generating Summary...' : 'Get Summary'}
          </button>
        </form>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {summary && (
          <div className={styles.summaryContainer}>
            <h3 className={styles.summaryTitle}>Video Summary</h3>
            <div className={styles.summary}>
              <p>{summary}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
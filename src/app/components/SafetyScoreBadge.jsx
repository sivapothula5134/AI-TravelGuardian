import { Shield } from 'lucide-react';

export function SafetyScoreBadge({ score }) {
  const getScoreColor = (score) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return 'Safe';
    if (score >= 6) return 'Moderate';
    return 'Caution';
  };

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${getScoreColor(score)}`}>
      <Shield className="w-4 h-4" />
      <span className="font-medium">{score.toFixed(1)}</span>
      <span className="text-xs">• {getScoreLabel(score)}</span>
    </div>
  );
}

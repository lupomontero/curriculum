import { FormattedMessage } from 'react-intl';
import Typography from '@mui/material/Typography';

const LearningObjectives = () => {
  return (
    <div>
      <Typography variant="h1">
        <FormattedMessage id="learning-objectives" />
      </Typography>
    </div>
  );
};

export default LearningObjectives;
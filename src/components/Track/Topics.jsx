import { Link, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useLocale } from '../../intl/IntlProvider';

const Topic = ({ topic }) => {
  const { lang } = useParams();
  return (
    <Card>
      <CardHeader
        action={
          <IconButton component={Link} to={`/${lang}/topics/${topic.slug}`} size="large">
            <ArrowForward />
          </IconButton>
        }
        title={topic.title}
      />
    </Card>
  );
};

const Topics = ({ topics, track }) => {
  const { locale } = useLocale();
  const filteredTopics = topics
    .map(t => ({ ...t, slug: /-pt/.test(t.slug) ? t.slug.slice(0, -3) : t.slug }))
    .filter(t => t.track === track && t.locale === locale);
  const jsTopicIdx = filteredTopics.findIndex(({ slug }) => slug === 'javascript');
  if (jsTopicIdx >= 0) {
    const jsTopic = filteredTopics[jsTopicIdx];
    filteredTopics.splice(jsTopicIdx, 1);
    filteredTopics.unshift(jsTopic);
  }
  return (
    <div>
      <Typography variant="h2">
        <FormattedMessage id="topics" />
      </Typography>
      <Grid container spacing={3}>
        {filteredTopics.map(topic => (
          <Grid key={topic.slug} item xs={12} sm={6} md={4} lg={3}>
            <Topic topic={topic} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
};

export default Topics;
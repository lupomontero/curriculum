import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { useLocale } from '../../intl/IntlProvider';

const Topic = ({ topic }) => {
  const history = useHistory();
  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={() => history.push(`/topics/${topic.slug}`)}>
            <ArrowForward />
          </IconButton>
        }
        title={topic.title}
        subheader={'OMG'}
      />
      <CardContent>

      </CardContent>
    </Card>
  );
};

const Topics = ({ topics, track }) => {
  const { locale } = useLocale();

  // console.log('topics', topics);

  const filteredTopics = topics.filter(
    t => t.track === track && t.locale === locale,
  );

  return (
    <Container>
      <Typography variant="h2">Topics</Typography>
      <Grid container spacing={3}>
        {filteredTopics.map(topic => (
          <Grid key={topic.slug} item xs={12} sm={6} md={4} lg={3}>
            <Topic topic={topic} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
};

export default Topics;
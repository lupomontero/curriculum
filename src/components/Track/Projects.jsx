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

const Project = ({ project }) => {
  const history = useHistory();
  const learningObjectiveCats = (project.learningObjectives || []).reduce(
    (memo, item) => (
      !memo.includes(item.split('/')[0])
        ? memo.concat(item.split('/')[0])
        : memo
    ),
    [],
  );
  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={() => history.push(`/projects/${project.slug}`)}>
            <ArrowForward />
          </IconButton>
        }
        title={project.title}
        subheader={learningObjectiveCats.join(', ')}
      />
      <CardContent>
        {project.title}
      </CardContent>
    </Card>
  );
};

const ProjectGroup = ({ prefix, projects }) => {
  return (
    <div>
      <Typography variant="h3">{prefix}</Typography>
      <Grid container spacing={3}>
        {projects.map(project => (
          <Grid key={project.slug} item xs={12} sm={6} md={4} lg={3}>
            <Project project={project} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const Projects = ({ projects, track }) => {
  const { locale } = useLocale();
  // console.log('projects', projects);

  const projectsByPrefix = projects
    .filter(p => p.track === track && p.locale === locale)
    .reduce(
      (memo, p) => ({ ...memo, [p.prefix]: (memo[p.prefix] || []).concat(p) }),
      {},
    );

  return (
    <Container>
      <Typography variant="h2">Projects</Typography>
      {Object.keys(projectsByPrefix).sort().map(prefix => (
        <ProjectGroup
          key={`group-${prefix}`}
          prefix={prefix}
          projects={projectsByPrefix[prefix]}
        />
      ))}
    </Container>
  )
};

export default Projects;
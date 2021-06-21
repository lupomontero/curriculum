import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import AceEditor from 'react-ace';
import Breadcrumbs from '../Breadcrumbs';
import Content from '../Content';
import { slugToFilename, decodeFilenameKeys } from './util';
import createTestRunner from './test-runner';
import TestResults from './TestResults';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-solarized_light';

const Exercise = ({ topic }) => {
  const { unit, part, exerciseid } = useParams();
  const exercise = topic.syllabus[unit].parts[part].exercises[exerciseid];
  const files = decodeFilenameKeys(exercise.files);
  const boilerplate = files.boilerplate && files.boilerplate[slugToFilename(exerciseid)];
  const [editorValue, setEditorValue] = useState(boilerplate || '');
  const [testResults, setTestResults] = useState();
  const runTests = createTestRunner(files.test);

  return (
    <>
      <Breadcrumbs topic={topic} />
      <h1>{exercise.title}</h1>
      <Content html={exercise.body} />
      <AceEditor
        style={{ width: '100%', marginBottom: 30 }}
        mode="javascript"
        theme="solarized_light"
        onChange={text => setEditorValue(text)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          autoScrollEditorIntoView: true,
          maxLines: 20,
        }}
        value={editorValue}
        tabSize={2}
        fontSize={18}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={
            () => runTests(editorValue)
              .then(setTestResults)
              .catch(console.error)
          }
        >
          <FormattedMessage id="exercise.runTests" />
        </Button>
      </div>
      {testResults && <TestResults results={testResults} />}
    </>
  );
};

export default Exercise;
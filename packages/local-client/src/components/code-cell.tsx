import './code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizer from './resizer';
import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell
}
const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1500);

    // Return function feature of useEffect()
    return () => {
      clearTimeout(timer);
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return ( 
    <Resizer direction="vertical">
    <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
      <Resizer direction="horizontal">
        <CodeEditor 
          initialValue={cell.content} 
          onChange={(value) => updateCell(cell.id, value)}
        />
      </Resizer>
      <div className="progress-wrapper">
        {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-danger is-small" max="100">
                Loading
              </progress>
            </div>
        ) : (<Preview code={bundle.code} err={bundle.err} />)
        }
      </div>
    </div>
    </Resizer>
  );
};

export default CodeCell;
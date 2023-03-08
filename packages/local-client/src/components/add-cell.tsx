import './add-cell.css';
import { useActions } from '../hooks/useActions';

interface AddCellProps {
  previousCellId: string | null;
  forceVisibility?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisibility, previousCellId }) => { 
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisibility && 'force-visibility'}`}>
      <div className="add-buttons">
          <button
            className="button is-rounded is-danger is-small" 
            onClick={() => insertCellAfter(previousCellId, 'code')}
          >
            <span className="icon is-small"><i className="fas fa-solid fa-code" /></span>
          </button>

          <button 
            className="button is-rounded is-primary is-small"
            onClick={() => insertCellAfter(previousCellId, 'text')}
          >
            <span className="icon is-small"><i className="fas fa-solid fa-pen" /></span>
          </button>
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default AddCell;

import { FC } from 'react';
import { IComment } from '../../store/projectsReducer';
import styles from './Comment.module.scss';

interface ICommentProps {
    comment: IComment;
    onClick: (id: string) => void;
}

const Comment: FC<ICommentProps> = ({ comment, onClick }) => {
    const handleRemove = () => onClick(comment?.id);
    return (
        <div className={styles.comment}>
            <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{comment?.author}</span>
                <span className={styles.commentTime}>{comment?.time}</span>
            </div>
            <span className={styles.commentBody}>{comment?.text}</span>
            <div className={styles.commentActions}>
                <div className={styles.commentReply}>Ответить</div>
                <div className={styles.commentDelete} onClick={handleRemove}>
                    Удалить
                </div>
            </div>
        </div>
    );
};

export default Comment;

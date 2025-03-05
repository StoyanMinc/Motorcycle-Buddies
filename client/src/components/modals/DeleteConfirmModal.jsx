export default function DeleteConfirmModal({
    deleteHandler,
    hideModalHanlder
}) {
    return( 
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm delete motorcycle</h2>
                <p>Are you sure you want to delete this motorcycle?</p>
                <div className="modal-actions">
                    <button className="cancel-btn modal-btn" onClick={() => hideModalHanlder(false)}>cancel</button>
                    <button className="confirm-btn modal-btn" onClick={deleteHandler}>delete</button>
                </div>
            </div>
        </div>
    )
}
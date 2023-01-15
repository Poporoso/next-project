import React from 'react'

const NoProdotto = () => {
    return (
        <div className='no-result'>
            <div className="wrap-noresult">
                <i className="ion-android-search search-1"></i>
                <i className="ion-android-search search-2"></i>
                <i className="ion-android-search search-3"></i>
                <i className="ion-android-search search-4"></i>
                <div className="items">
                    <i className="ion ion-document"></i>
                    <i className="ion ion-document-text"></i>
                    <i className="ion ion-ios-copy-outline"></i>
                    <i className="ion ion-ios-paper-outline"></i>
                    <i className="ion ion-sad-outline"></i>
                    <i className="ion ion-document"></i>
                    <i className="ion ion-document-text"></i>
                    <i className="ion ion-ios-copy-outline"></i>
                    <i className="ion ion-ios-paper-outline"></i>
                    <i className="ion ion-sad-outline"></i>
                </div>
            </div>
            <div className='info-text'>
                <h2>No results</h2>
                <p>
                    <em>
                        We searched far and wide and couldn&#39;t <br />
                        find anyone matching your search.
                    </em>
                </p>
            </div>

        </div>
    )
}

export default NoProdotto
import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/Inputs/InputButtons/Button'
import InputButtons from '../../../components/Inputs/InputButtons/InputButtons'
import InputRange from '../../../components/Inputs/InputRange/InputRange'
import useDebounce from '../../../hooks/useDebounce'
import { setBilateralValue, setMedianValue, setModifiedImage } from '../../../redux/actions/actions'
import './RecoverySettings.scss'

const settingsMedian = [
    {
        title: '1x',
        value: 1,
    },
    {
        title: '3x',
        value: 3,
    },
    {
        title: '5x',
        value: 5,
    }
]

const settingsBilateral = [
    {
        title: '0',
        value: 0,
    },
    {
        title: '10',
        value: 10,
    },
    {
        title: '20',
        value: 20,
    }
]


const RecoverySettings = ({ onSetMedianValue, onSetBilateralValue, onSetModifiedImage, filters, isLoading }) => {
    // const [filterSettings, setFilterSettings] = useState(filters)
    // const debouncedFilterSettings = useDebounce(filterSettings, 100)

    // useEffect(() => {
    //     onSetMedianValue(filterSettings.median)
    // }, [debouncedFilterSettings])

    // const inputHandler = (value) => {
    //     setFilterSettings({
    //         ...filterSettings,
    //         median: value
    //     })
    // }

    const clickHandlerMedian = (value) => {
        onSetMedianValue(value)
    }

    const clickHandlerBilateral = (value) => {
        onSetBilateralValue(value)
    }

    const resetRecoverySettings = () => {
        onSetMedianValue(1)
        onSetBilateralValue(0)
        onSetModifiedImage("")
    }

    return (
        <div className="recovery-settings">
            {/* <InputRange title='Медіанна фільтрація' name="medianFilter" dimension='x' inputHandler={(e) => { inputHandler(e.target.value) }} range={{ min: '1', max: '5', step: '2' }} value={filters.median} /> */}
            <InputButtons settings={settingsMedian} clickHandler={clickHandlerMedian} activeValue={+filters.median} isLoading={isLoading} title='Медіанна фільтрація' />
            <InputButtons settings={settingsBilateral} clickHandler={clickHandlerBilateral} activeValue={+filters.bilateral} isLoading={isLoading} title='Білатеральна фільтрація' />
            <div className="recovery__button-wrap">
                <button onClick={resetRecoverySettings} disabled={filters.median === 1 && filters.bilateral === 0} className="recovery__button button--danger">
                    <FontAwesomeIcon className="header__link-icon icon--xsm" icon={faFileDownload} />
                    <span className="header__link-text text--md">Скинути</span>
                </button>
                {/* <button onClick={resetRecoverySettings} disabled={filters.median === 1 && filters.bilateral === 0} className="recovery__button button--success">
                    <FontAwesomeIcon className="header__link-icon icon--xsm" icon={faFileDownload} />
                    <span className="header__link-text text--md">Зберегти</span>
                </button> */}
            </div>
        </div>
    )
}

const mapStateToProps = ({ recovery: { filters, isLoading } }) => {
    return {
        filters,
        isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetMedianValue: (value) => dispatch(setMedianValue(value)),
        onSetBilateralValue: (value) => dispatch(setBilateralValue(value)),
        onSetModifiedImage: (link) => dispatch(setModifiedImage(link))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverySettings)
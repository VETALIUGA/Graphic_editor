import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import InputRange from '../../../components/Inputs/InputRange/InputRange'
import useDebounce from '../../../hooks/useDebounce'
import { setMedianValue } from '../../../redux/actions/actions'
import './RecoverySettings.scss'

const RecoverySettings = ({ onSetMedianValue, filters }) => {
    const [filterSettings, setFilterSettings] = useState(filters)
    const debouncedFilterSettings = useDebounce(filterSettings, 100)

    useEffect(() => {
        onSetMedianValue(filterSettings.median)
    }, [debouncedFilterSettings])

    const inputHandler = (value) => {
        setFilterSettings({
            ...filterSettings,
            median: value
        })
    }

    return (
        <div>
            <InputRange title='Медіанна фільтрація' name="medianFilter" dimension='x' inputHandler={(e) => { inputHandler(e.target.value) }} range={{ min: '1', max: '5', step: '2' }} value={filters.median} />
        </div>
    )
}

const mapStateToProps = ({ recovery: { filters } }) => {
    return {
        filters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetMedianValue: (value) => dispatch(setMedianValue(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverySettings)
/**
 * @file Request validators for Express API query parameters.
 * @description Defines `express-validator` middleware for validating query parameters
 * (e.g., `ids`, `room`, `difficulty`) used in routes like `src/routes/itemsRoutes.ts` and
 * `src/routes/mapsRoutes.ts`. Ensures type safety with literal types (e.g., {@link DifficultyLevel},
 * {@link ItemType}). Uses centralized messages from {@link ../constants/messages.ts} for error
 * responses. Validators for comma-separated strings (e.g., `ids`, `items`) use dynamic messages
 * with `{subject}` replacement.
 * @see {@link ../constants/messages.ts}
 * @see {@link ../data/types.ts}
 */
import { query, ValidationChain } from 'express-validator';
import { Messages } from '../constants/messages';
import {
    DifficultyLevelEnum,
    ItemTypeEnum,
    RoomFunctionEnum,
    AccessKeyEnum,
    RoomThreatLevelEnum,
    BiohazardCodeEnum,
} from '../data';

/**
 * @param allowedParams - Array of allowed query parameter names (e.g., from Object.keys(Enum)).
 * @param allowedParams - Array of allowed query parameter names.
 * @returns {ValidationChain} Express-validator middleware that throws BadRequestError for unrecognized parameters.
 */
export const restrictSearchQueryParams = (allowedParams: string[]): ValidationChain => {
    return query().custom((value, { req }) => {
        const queryParams = Object.keys(req.query || {});
        const unrecognizedParams = queryParams.filter((param) => !allowedParams.includes(param));
        if (unrecognizedParams.length > 0) {
            throw new Error(
                Messages.validation.unrecognizedQueryParameters.replace(
                    '{params}',
                    unrecognizedParams.join(', '),
                ),
            );
        }
        return true;
    });
};

export const idsValidator = query('ids')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'IDs'))
    .customSanitizer((value) => (value ? value.trim() : value));

export const codesValidator = query('codes')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'Codes'))
    .customSanitizer((value) => (value ? value.trim() : value));

export const roomValidator = query('room')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Room'))
    .matches(/^[a-zA-Z0-9-]+$/)
    .withMessage(Messages.validation.invalidRoomIdFormat);

export const mapValidator = query('map')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Map'))
    .matches(/^[a-zA-Z0-9-]+$/)
    .withMessage(Messages.validation.invalidMapIdFormat);

export const itemValidator = query('items')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'Items'));

export const biohazardValidator = query('biohazards')
    .optional()
    .isString()
    .withMessage(
        Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'Biohazards'),
    );

export const personValidator = query('persons')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'Persons'));

export const interactableValidator = query('interactables')
    .optional()
    .isString()
    .withMessage(
        Messages.validation.invalidCommaSeparatedString.replace('{subject}', 'Interactables'),
    );

export const difficultyValidator = query('difficulty')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Difficulty'))
    .isIn(Object.values(DifficultyLevelEnum))
    .withMessage(Messages.validation.invalidDifficultyLevel);

export const typeValidator = query('type')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Type'))
    .isIn(Object.values(ItemTypeEnum))
    .withMessage(Messages.validation.invalidItemType);

export const roomFunctionValidator = query('roomFunction')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Room function'))
    .isIn(Object.values(RoomFunctionEnum))
    .withMessage(Messages.validation.invalidRoomFunction);

export const adjoiningRoomValidator = query('adjoiningRoom')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Adjoining room'))
    .matches(/^[a-zA-Z0-9-]+$/)
    .withMessage(Messages.validation.invalidAdjoiningRoomIdFormat);

export const accessKeyValidator = query('accessKey')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Access key'))
    .isIn(Object.values(AccessKeyEnum))
    .withMessage(Messages.validation.invalidAccessKey);

export const threatLevelValidator = query('threatLevel')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Threat level'))
    .isIn(Object.values(RoomThreatLevelEnum))
    .withMessage(Messages.validation.invalidThreatLevel);

export const roomNumberValidator = query('roomNumber')
    .optional()
    .isInt()
    .withMessage(Messages.validation.invalidNumber.replace('{subject}', 'Room number'));

export const nameValidator = query('name')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Name'));

export const codeValidator = query('code')
    .optional()
    .isString()
    .withMessage(Messages.validation.invalidString.replace('{subject}', 'Code'))
    .isIn(Object.values(BiohazardCodeEnum))
    .withMessage(Messages.validation.invalidBiohazardCode);

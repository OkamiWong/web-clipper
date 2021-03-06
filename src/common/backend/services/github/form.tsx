import { Form, Input, Select, Icon, Tooltip } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Fragment } from 'react';
import { GithubBackendServiceConfig } from './interface';
import { FormattedMessage } from 'react-intl';
import locale from '@/common/locales';
import { stringify } from 'qs';

interface GithubFormProps {
  verified?: boolean;
  info?: GithubBackendServiceConfig;
}

const GenerateNewTokenUrl = `https://github.com/settings/tokens/new?${stringify({
  scopes: 'repo',
  description: 'Web Clipper',
})}`;

const visibilityOptions = [
  {
    label: (
      <FormattedMessage id="backend.services.github.form.visibility.all" defaultMessage="All" />
    ),
    value: 'all',
  },
  {
    label: (
      <FormattedMessage
        id="backend.services.github.form.visibility.public"
        defaultMessage="Public"
      />
    ),
    value: 'public',
  },
  {
    label: (
      <FormattedMessage
        id="backend.services.github.form.visibility.private"
        defaultMessage="Private"
      />
    ),
    value: 'private',
  },
];

const storageOptions = [
  {
    label: (
      <FormattedMessage
        id="backend.services.github.form.storageLocation.issue"
        defaultMessage="Issue"
      />
    ),
    value: 'issue',
  },
  {
    label: (
      <FormattedMessage
        id="backend.services.github.form.storageLocation.code"
        defaultMessage="Code"
      />
    ),
    value: 'code',
  },
];

const GithubForm: React.FC<GithubFormProps & FormComponentProps> = ({
  form: { getFieldDecorator, getFieldValue },
  info,
  verified,
}) => {
  const disabled = verified || !!info;
  let initAccessToken;
  let visibility;
  let storageLocation;
  let savePath;
  if (info) {
    initAccessToken = info.accessToken;
    visibility = info.visibility;
    storageLocation = info.storageLocation;
    savePath = info.savePath;
  }
  return (
    <Fragment>
      <Form.Item
        label={
          <FormattedMessage
            id="backend.services.github.form.visibility"
            defaultMessage="Visibility"
          />
        }
      >
        {getFieldDecorator('visibility', {
          initialValue: visibility,
        })(
          <Select allowClear>
            {visibilityOptions.map(o => (
              <Select.Option value={o.value} key={o.value}>
                {o.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="AccessToken">
        {getFieldDecorator('accessToken', {
          initialValue: initAccessToken,
          rules: [
            {
              required: true,
              message: (
                <FormattedMessage
                  id="backend.services.github.accessToken.message"
                  defaultMessage="AccessToken is required"
                />
              ),
            },
          ],
        })(
          <Input
            disabled={disabled}
            suffix={
              <Tooltip
                title={
                  <span
                    style={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {locale.format({
                      id: 'backend.services.github.form.GenerateNewToken',
                      defaultMessage: 'Generate new token',
                    })}
                  </span>
                }
              >
                <a href={GenerateNewTokenUrl} target={GenerateNewTokenUrl}>
                  <Icon type="key" />
                </a>
              </Tooltip>
            }
          />
        )}
      </Form.Item>
      <Form.Item
        label={
          <FormattedMessage
            id="backend.services.github.form.storageLocation"
            defaultMessage="Storage Location"
          />
        }
      >
        {getFieldDecorator('storageLocation', {
          initialValue: storageLocation,
        })(
          <Select allowClear>
            {storageOptions.map(o => (
              <Select.Option value={o.value} key={o.value}>
                {o.label}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item
        label={
          <FormattedMessage
            id="backend.services.github.form.storageLocation.code.savePath"
            defaultMessage="Save Path"
          />
        }
      >
        {getFieldDecorator('savePath', {
          initialValue: savePath,
          rules: [
            {
              required: false,
            },
          ],
        })(
          <Input
            disabled={getFieldValue('storageLocation') === 'issue'}
            placeholder={locale.format({
              id: 'backend.services.github.form.storageLocation.code.savePathPlaceHolder',
              defaultMessage: 'Only takes effect when saving to code.',
            })}
          />
        )}
      </Form.Item>
    </Fragment>
  );
};

export default GithubForm;

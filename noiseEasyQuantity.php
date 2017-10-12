<?php

namespace noiseEasyQuantity;

use Shopware\Components\Plugin\Context\ActivateContext;
use Shopware\Components\Plugin\Context\DeactivateContext;
use Shopware\Components\Plugin\Context\InstallContext;
use Shopware\Components\Plugin\Context\UpdateContext;
use Shopware\Components\Plugin\Context\UninstallContext;
use Doctrine\Common\Collections\ArrayCollection;

class noiseEasyQuantity extends \Shopware\Components\Plugin
{

	public static function getSubscribedEvents()
	{
		return [
			'Enlight_Controller_Front_DispatchLoopStartup' => 'onPostDispatch',
			'Theme_Compiler_Collect_Plugin_Less' => 'addLessFiles',
			'Theme_Compiler_Collect_Plugin_Javascript' => 'addJSFiles'
		];
	}

	public function onPostDispatch(\Enlight_Event_EventArgs $args)
	{
		$this->container->get('Template')->addTemplateDir(
			$this->getPath() . '/Resources/views/'
		);
	}

	public function addLessFiles(\Enlight_Event_EventArgs $args)
	{
		$less = new \Shopware\Components\Theme\LessDefinition([], [__DIR__ . '/Resources/views/frontend/_public/src/less/style.less']);
		return new  ArrayCollection([$less]);
	}

	public function addJSFiles(\Enlight_Event_EventArgs $args)
	{
		$jsFiles = array(__DIR__ . '/Resources/views/frontend/_public/src/js/script.js');

		return new  ArrayCollection($jsFiles);
	}


	public function getVersion()
	{
		return '1.0.0';
	}

	public function getLabel()
	{
		return 'Plugin to replace the standard quantity text field with a plus and minus icon';
	}

	/**
	 * Returns capabilities
	 */
	public function getCapabilities()
	{
		return [
			'install' => true,
			'update' => true,
			'enable' => true,
			'secureUninstall' => false
		];
	}


	/**
	 * @param ActivateContext $context
	 */
	public function activate(ActivateContext $context)
	{
		$context->scheduleClearCache(InstallContext::CACHE_LIST_ALL);
	}

	/**
	 * @return array
	 */
	public function enable()
	{
		return $this->getInvalidateCache();
	}

}
